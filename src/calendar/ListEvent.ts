import { google } from "googleapis";
import { getOAuth2Client } from "./Auth";

export const ListEvent = async () => {
  try {
    const auth = await getOAuth2Client();
    const calendar = google.calendar({ version: "v3", auth });

    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err, res) => {
        if (err) {
          return console.log("APIはエラーを返しました" + err);
        }
        const result = res?.data.items;

        // ここに予定の配列が入る
        const events = [];

        if (result?.length) {
          console.log("10の今後の予定");
          result.map((result, i: number) => {
            const start = result.start?.dateTime || result.start?.date;
            console.log(`${start} - ${result.summary}`);
            const a = `${start} - ${result.summary}`;
            return a;
          });
        } else {
          console.log("イベントは見つかりませんでした.");
        }
      }
    );
  } catch (err: unknown) {
    console.log(err);
  }
};
