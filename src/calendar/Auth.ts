import { promises as fs } from "fs";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export const getOAuth2Client = async (): Promise<OAuth2Client> => {
  // credentialファイルを読み込む

  const credentialText = await fs.readFile(
    "src/config/credentials.json",
    "utf-8"
  );
  //   credentialファイルをJSONとして解析
  const credentials = JSON.parse(credentialText);

  const tokenText = await fs.readFile("src/config/token.json", "utf-8");
  const token = JSON.parse(tokenText);

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials(token);

  return oAuth2Client;
};
