// Veritabanındaki tarihi olduğu gibi göstermek için yardımcı fonksiyon
export function showDbDateAsIs(dateStr: string) {
  if (!dateStr) return ''
  // ISO formatı veya '2025-08-27 14:15:00.0000000' gibi formatlar için
  // Sadece ilk 19 karakteri (YYYY-MM-DD HH:mm:ss) al
  return dateStr.replace('T', ' ').substring(0, 19)
}
