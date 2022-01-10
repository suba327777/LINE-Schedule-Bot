// ファイルを用いた機能
const fs = require("fs");
// 行を読み込む　(入力の取得)
const readline = require("readline");

// googleAPIの使用
const { google } = require("googleapis");

// もし,これらのスコープを変更する場合はtoken.jsonを削除すること
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

//token.jsonにはユーザーのアクセストークンやリフレッシュトークンが格納され,以下のようになる　.
// 認可フローが初めて完了したときに自動的に作成される

// とりあえず認可フローを踏んでもらえるとユーザーのトークンが生成される

const TOKEN_PATH = "token.json";

// ローカルファイルからクライアントシークレットを読み込む

fs.readFile("../credentials.json", (err, content) => {
  if (err) {
    return console.log("Error loading client secret file", err);
  }
  // credentials(資格情報)でクライアントを認証し,googlecalendarAPIを呼びだす
  authorize(JSON.parse(content), listEvents);
});

// 指定された認証情報でOAuth2クライアントを作成し実行作成し、実行する
// 与えられたコールバック関数は
// {Object} credentials 認証クライアントの認証情報
// {function} callback 認証されたクライアントで呼び出すコールバックです。

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  //   以前にトークンを保存したかどうかを確認する。
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

// ** ここからはユーザー認証

//  ユーザーの認証を促した後、新しいトークンを取得・保存する。認可されたOAuth2クライアントで、指定されたコールバックを実行します。

// {google.auth.OAuth2} oAuth2Client トークンを取得する OAuth2 クライアント。
// {getEventsCallback}  callback 認証されたクライアントのコールバック

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("このURLにアクセスし、このアプリを認証してください。", authUrl);

  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r1.question("そのページに記載されているコードをここに入力", (code) => {
    r1.close();

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return console.error("アクセストークンの取得に失敗しました", err);
      }
      oAuth2Client.setCredentials(token);
      //   トークンをディスクに保存し、後でプログラムを実行できるようにする。
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("トークン格納先", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
// ** ここまで

// ユーザーのプライマリーカレンダーの次の10件をリストアップ
// {google.auth.OAuth2} auth OAuth2 の認証済みクライアント。

function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) {
        return console.log("APIはエラーを返しました" + err);
      }
      const events = res.data.items;
      if (events.length) {
        console.log("10の今後の予定:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}
