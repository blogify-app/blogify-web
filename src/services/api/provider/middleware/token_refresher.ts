import {refreshIdToken} from "@/services/security";
import {ProviderMiddleware} from "@/services/api/provider/middleware/provider_middleware.ts";

// 59 mins
const TOKEN_EXPIRATION_MILLIS = 1_000 * 60 * 30;

export class TokenRefresher implements ProviderMiddleware {
  private static LAST_REFRESHED_KEY = "token_refresher:last";

  async onCall<T>(call: () => Promise<T>): Promise<T> {
    const lastRefreshed = this.getLastRefreshed();
    const now = Date.now();
    if (now - lastRefreshed > TOKEN_EXPIRATION_MILLIS) {
      await this.doRefresh();
      console.log("refreshed");
    }
    return call();
  }

  private getLastRefreshed() {
    return Number(localStorage.getItem(TokenRefresher.LAST_REFRESHED_KEY)) || 0;
  }

  private async doRefresh() {
    try {
      await refreshIdToken();
      localStorage.setItem(
        TokenRefresher.LAST_REFRESHED_KEY,
        String(Date.now())
      );
    } catch (e) {
      throw {
        status: 403,
        message: "Token expired",
      };
    }
  }
}
