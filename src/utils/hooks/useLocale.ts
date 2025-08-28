import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useStoreState } from '@/store'
import { dateLocales } from '@/constants/dateLocales.constant'

function useLocale() {
  const cultureName = useStoreState((state) => state.locale.currentLang)
  const languageList = useStoreState((state) => state.abpConfig.config?.localization.languages)
  const twoLetterISOLanguageName = languageList?.find(
    (lang) => lang.cultureName === cultureName,
  )?.twoLetterISOLanguageName

  useEffect(() => {
    if (cultureName && twoLetterISOLanguageName && dateLocales[twoLetterISOLanguageName]) {
      dateLocales[twoLetterISOLanguageName]().then(() => {
        dayjs.locale(cultureName)
      })
    }
  }, [cultureName, twoLetterISOLanguageName])

  return cultureName
}

export default useLocale
