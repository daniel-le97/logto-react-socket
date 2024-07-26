
import LogtoClient from "@logto/browser";
import { type LogtoConfig, UserScope } from "@logto/react";

export const baseUrl = "com.auth-react://sign-out";
// export const baseUrl = window.location.origin;

export const redirectUrl = `com.auth-react://callback`;
// export const redirectUrl = `http://localhost:5173/callback`;

export const baseConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APPID,
};

export const config: LogtoConfig = {
  ...baseConfig,
  scopes: [
    UserScope.Email,
    UserScope.Phone,
    UserScope.CustomData,
    UserScope.Identities,
    UserScope.Organizations,
  ],
};



export class Client extends LogtoClient {
  constructor(conf: LogtoConfig, unstable_enableCache?: boolean) {
    super(conf, unstable_enableCache);
    if (import.meta.env.MODE === "native") {
      this.adapter.navigate = async (url) => {
        const application = await import("socket:application");
        const currentWindow = await application.getCurrentWindow();
        await currentWindow.openExternal(url);
      };
    }
  }
}

