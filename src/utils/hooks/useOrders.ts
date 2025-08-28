import { Product } from '@/proxy/order/models'
import { useState, useEffect } from 'react'

export const useOrders = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setProducts(products)
      setError(null)
    } catch (err) {
      console.error('Products fetch error:', err)
      setError('Ürünler yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, refetch: fetchProducts }
}
