import { AuthConfig } from 'angular-oauth2-oidc';

export function getAuthConfig(): AuthConfig {
  return {
    issuer: 'https://accounts.google.com',
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
    clientId: 'YOUR_GOOGLE_AUTH_CLIENT_ID.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
  };
}
