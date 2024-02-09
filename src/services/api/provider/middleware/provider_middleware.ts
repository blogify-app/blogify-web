import {DataProvider} from "@/services/api";
import {TokenRefresher} from "@/services/api/provider/middleware/token_refresher.ts";

export interface ProviderMiddleware {
  /**
   * called prior to dataProvider method execution
   * @param call dataProvider invocation callback
   */
  onCall<T>(call: () => Promise<T>): Promise<T>;
}

export const middlewares = <D extends DataProvider>(
  provider: D,
  ops: ProviderMiddleware[]
): D => {
  Object.keys(provider).forEach((key) => {
    const method = key as keyof DataProvider;
    ops.forEach((decorate) => {
      const fn = provider[method];
      provider[method] = (...args: any[]) => {
        // @ts-ignore
        return decorate.onCall(() => fn(...args));
      };
    });
  });
  return provider;
};

export const dataProvider = <D extends DataProvider>(provider: D): D => {
  return middlewares(provider, [new TokenRefresher()]);
};
