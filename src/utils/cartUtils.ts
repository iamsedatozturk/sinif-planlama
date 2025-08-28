import { BillingCycle, BasketItem, ProductDto } from "@/proxy/order/models";

export interface CartState {
  items: BasketItem[];
  total: number;
  globalBillingCycle: BillingCycle;
  globalPeriod: number;
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
  globalBillingCycle: 'yearly',
  globalPeriod: 1
};

// Key for localStorage
const CART_STORAGE_KEY = 'cartState';

export const calculateItemPrice = (
  product: ProductDto,
  quantity: number,
  billingCycle: BillingCycle,
  period: number = 1
): number => {
  const price = billingCycle === 'monthly' ? product.monthlyPrice! : product.yearlyPrice!;
  return price * quantity * period;
};

export const addItemToCart = (
  cartState: CartState,
  product: ProductDto,
  quantity: number,
  billingCycle: BillingCycle
): CartState => {
  const isAlreadyInCart = isItemInCartState(cartState.items, product.id, billingCycle);

  if (!product.isQuantityBased && isAlreadyInCart) {
    return cartState;
  }

  const existingItemIndex = cartState.items.findIndex(
    item => item.product.id === product.id && item.billingCycle === billingCycle
  );

  let newItems;
  if (existingItemIndex > -1) {
    newItems = [...cartState.items];
    newItems[existingItemIndex].quantity += quantity;
    newItems[existingItemIndex].totalPrice = calculateItemPrice(
      product,
      newItems[existingItemIndex].quantity,
      billingCycle,
      cartState.globalPeriod
    );
  } else {
    const actualQuantity = !product.isQuantityBased ? 1 : quantity;
    const totalPrice = calculateItemPrice(product, actualQuantity, billingCycle, cartState.globalPeriod);
    newItems = [...cartState.items, { product, quantity: actualQuantity, billingCycle, totalPrice }];
  }

  const total = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const updatedState = { ...cartState, items: newItems, total };
  saveCartToLocalStorage(updatedState);
  return updatedState;
};

export const removeItemFromCart = (cartState: CartState, id: string): CartState => {
  const newItems = cartState.items.filter(item => item.product.id !== id);
  const total = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const updatedState = { ...cartState, items: newItems, total };
  saveCartToLocalStorage(updatedState);
  return updatedState;
};

export const updateCartItemQuantity = (cartState: CartState, id: string, quantity: number): CartState => {
  const newItems = cartState.items.map(item => {
    if (item.product.id === id) {
      if (quantity <= 0) return null;
      if (!item.product.isQuantityBased) return item;

      return {
        ...item,
        quantity,
        totalPrice: calculateItemPrice(item.product, quantity, item.billingCycle, cartState.globalPeriod)
      };
    }
    return item;
  }).filter(Boolean) as BasketItem[];

  const total = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const updatedState = { ...cartState, items: newItems, total };
  saveCartToLocalStorage(updatedState);
  return updatedState;
};

export const clearCart = (): CartState => {
  localStorage.removeItem(CART_STORAGE_KEY);
  return initialCartState;
};

export const setCartGlobalBillingCycle = (cartState: CartState, cycle: BillingCycle): CartState => {
  const newItems = cartState.items.map(item => ({
    ...item,
    billingCycle: cycle,
    totalPrice: calculateItemPrice(item.product, item.quantity, cycle, cartState.globalPeriod)
  }));
  const total = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const updatedState = { ...cartState, globalBillingCycle: cycle, items: newItems, total };
  saveCartToLocalStorage(updatedState);
  return updatedState;
};

export const setCartGlobalPeriod = (cartState: CartState, period: number): CartState => {
  const newItems = cartState.items.map(item => ({
    ...item,
    totalPrice: calculateItemPrice(item.product, item.quantity, item.billingCycle, period)
  }));
  const total = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const updatedState = { ...cartState, globalPeriod: period, items: newItems, total };
  saveCartToLocalStorage(updatedState);
  return updatedState;
};

export const isItemInCart = (cartState: CartState, productId: string, billingCycle: BillingCycle): boolean => {
  return cartState.items.some(
    item => item.product.id === productId && item.billingCycle === billingCycle
  );
};

export const isItemInCartState = (items: BasketItem[], productId: string, billingCycle: BillingCycle): boolean => {
  return items.some(
    item => item.product.id === productId && item.billingCycle === billingCycle
  );
};

// Utility: Save to localStorage
const saveCartToLocalStorage = (cartState: CartState) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
};

// Utility: Load from localStorage
export const loadCartFromLocalStorage = (): CartState => {
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialCartState;
};
