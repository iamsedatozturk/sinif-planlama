import { useStoreState } from '@/store'

const useSetting = () => {
  const settingValues: Record<string, string> | undefined = useStoreState(
    (state) => state.abpConfig.config?.setting.values,
  )

  function setting(settingKey: string) {
    if (settingValues) {
      return settingValues[settingKey]
    }
  }

  return { setting }
}

export { useSetting }
