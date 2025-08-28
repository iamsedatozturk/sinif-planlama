import { getLocalization } from '@/services/localization.service'
import { useStoreState } from '@/store'

type TranslateParams = Record<string, string | number>

const useLocalization = () => {
  const { texts, config } = useStoreState((state) => state.abpConfig)

  function translate(
    localizationKey: string,
    params?: TranslateParams,
    defaultResourceName?: string
  ): string {
    // Guard against undefined texts
    if (!texts) {
      return localizationKey
    }

    return getLocalization(
      texts,
      defaultResourceName ?? config?.localization?.defaultResourceName,
      localizationKey,
      params
    )
  }

  return { translate }
}

export { useLocalization }
