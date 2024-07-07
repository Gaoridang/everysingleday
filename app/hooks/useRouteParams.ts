import { useLocalSearchParams } from "expo-router";

export function useRouteParams<
  T extends keyof ReactNavigation.RootParamList
>() {
  return useLocalSearchParams() as ReactNavigation.RootParamList[T];
}
