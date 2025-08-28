import { useEffect, useState } from "react";

export function usePWA(): boolean {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
      setIsPWA(isStandalone);
    };

    checkPWA(); // İlk kontrolü yap

    // display-mode değiştiğinde güncellenmesi için event listener ekle
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkPWA);

    return () => {
      // Event listener'ı temizle
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkPWA);
    };
  }, []);

  return isPWA;
}
