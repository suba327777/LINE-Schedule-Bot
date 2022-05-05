/* packages */
import { JWT } from "google-auth-library";
import { Auth, google } from "googleapis";
/* lib */
import { EMAIL, KEY } from "../../../lib/secrets";

export const jwtClient = async (): Promise<JWT> => {
  // 権限
  const SCOPE = ["https://www.googleapis.com/auth/calendar"];

  const jwtClient: Auth.JWT = new google.auth.JWT({
    email: EMAIL,
    key: KEY,
    keyFile: undefined,
    keyId: undefined,
    scopes: SCOPE,
    subject: undefined,
  });

  //   認証
  jwtClient.authorize();
  return jwtClient;
};
