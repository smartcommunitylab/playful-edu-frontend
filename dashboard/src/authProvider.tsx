import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AuthProvider } from "react-admin";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { OidcAuthProvider } from "@dslab/ra-auth-oidc";

const issuer: string = process.env.OIDC_ISSUER as string;
const client_id: string = process.env.OIDC_CLIENT_ID as string;

const authProvider = OidcAuthProvider({
  issuer: issuer,
  clientId: client_id,
  scope: "openid email profile",
});

export default authProvider;
