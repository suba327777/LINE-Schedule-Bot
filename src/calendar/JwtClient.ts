// google
import { JWT } from "google-auth-library";
import { Auth, google } from "googleapis";

// credential
import credentials from "../config/credentials.json";

export const JwtClient = async (): Promise<JWT> => {
  // 権限
  const SCOPE = ["https://www.googleapis.com/auth/calendar"];

  const jwtClient: Auth.JWT = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    keyFile: undefined,
    keyId: undefined,
    scopes: SCOPE,
    subject: undefined,
  });

  //   認証
  jwtClient.authorize();
  return jwtClient;
};
