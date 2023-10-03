import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AuthProvider } from "react-admin";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const authority: string = process.env.OIDC_AUTHORITY as string;
const client_id: string = process.env.OIDC_CLIENT_ID as string;
const redirect_uri: string = process.env.OIDC_REDIRECT_URI as string;

const userManager = new UserManager({
  authority,
  client_id,
  redirect_uri,
  scope: "openid email profile",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  loadUserInfo: true,
});

export interface CustomAuthProviderMethods extends AuthProvider {
  isUserSignedIn: () => Promise<boolean>;
  getAuthorization: () => Promise<string | null>;
}

const authProvider: CustomAuthProviderMethods = {
  login: () => {
    return userManager.signinRedirect();
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: () => {
    userManager.removeUser();
    return Promise.resolve();
  },
  getIdentity: async () => {
    const user = await userManager.getUser();

    return Promise.resolve({
      id: user?.profile.sub ?? "",
      fullName: user?.profile.preferred_username,
    });
  },
  // when the dataProvider returns an error, check if this is an authentication error
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      userManager.removeUser();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: async () => {
    const isAuthenticated = await userManager.getUser();
    return isAuthenticated ? Promise.resolve() : Promise.reject();
  },
  // get the user permissions (optional)
  getPermissions: () => {
    return Promise.resolve();
  },
  isUserSignedIn: async () => {
    const isAuthenticated = await userManager.getUser();
    return isAuthenticated ? Promise.resolve(true) : Promise.resolve(false);
  },
  getAuthorization: async () => {
    const user = await userManager.getUser();
    if (user) {
      return Promise.resolve("Bearer " + user.access_token);
    }

    return Promise.reject();
  },
  handleCallback: async () => {
    // get an access token based on the query paramaters
    const user = await userManager.signinRedirectCallback();
    userManager.storeUser(user);
    return Promise.resolve({ redirectTo: "/domains" });
  },
};

export default authProvider;
