import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AuthProvider } from "react-admin";
import { UserManager } from "oidc-client-ts";

const authority: string = process.env.OIDC_AUTHORITY as string;
const client_id: string = process.env.OIDC_CLIENT_ID as string;
const redirect_uri: string = process.env.OIDC_REDIRECT_URI as string;
const post_logout_redirect_uri: string = process.env
  .OIDC_POST_LOGOUT_REDIRECT_URI as string;
const silent_redirect_uri: string = process.env
  .OIDC_SILENT_REDIRECT_URI as string;

const api_url: string = process.env.REACT_APP_API_URL as string;

const userManager = new UserManager({
  authority,
  client_id,
  redirect_uri,
  post_logout_redirect_uri,
  silent_redirect_uri,
  response_type: "code",
  scope: "openid email profile",
  automaticSilentRenew: false,
  accessTokenExpiringNotificationTimeInSeconds: 10,
  filterProtocolClaims: true,
  loadUserInfo: true,
});

const cleanup = () => {
  window.history.replaceState(
    {},
    window.document.title,
    window.location.origin
  );
};

export interface CustomAuthProviderMethods extends AuthProvider {
  isUserSignedIn: () => boolean;
}

const authProvider: CustomAuthProviderMethods = {
  login: async () => {
    console.log("client_id", client_id);
    await userManager.signinRedirect();
    return;
  },
  logout: () => {
    localStorage.clear();
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.clear();
      return Promise.reject();
    } else return Promise.resolve();
  },
  checkAuth: () => {
    if (localStorage.getItem("auth")) return Promise.resolve();
    else return Promise.reject();
  },
  getPermissions: () => {
    return Promise.resolve();
  },
  isUserSignedIn: () => {
    return localStorage.getItem("auth") ? true : false;
  },
  handleCallback: async () => {
    try {
      // extract code and state from URL
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      // retrieve code_verifier from localStorage
      const stateKey = `oidc.${state}`;
      const { code_verifier } = JSON.parse(
        localStorage.getItem(stateKey) || "{}"
      );

      // fetch openid configuration
      const openidConfigurationResponse = await fetch(
        `${authority}.well-known/openid-configuration`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      );

      if (!openidConfigurationResponse.ok) {
        throw new Error("Failed to fetch openid configuration");
      }

      const openidConfiguration = await openidConfigurationResponse.json();
      const token_endpoint = openidConfiguration.token_endpoint;

      // prepare and send authentication request
      const authRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id,
          redirect_uri,
          code: code ? code : "",
          code_verifier,
          grant_type: "authorization_code",
        }).toString(),
      };

      const authResponse = await fetch(token_endpoint, authRequest);

      if (!authResponse.ok) {
        throw new Error("Authentication request failed");
      }

      const auth = await authResponse.json();

      // store authentication data in localStorage
      localStorage.setItem("auth", JSON.stringify(auth));
      userManager.clearStaleState();
      cleanup();

      return Promise.resolve({ redirectTo: "/domains" });
    } catch (error) {
      cleanup();
      return Promise.reject();
    }
  },
};

export default authProvider;
