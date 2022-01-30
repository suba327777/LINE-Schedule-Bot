// Load the Package
import { google, Auth, calendar_v3 } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Load the module
import { JwtClient } from "./JwtClient";

export const ListEvents = async () => {
  try {
    const jwt = await JwtClient();
    const calendar: calendar_v3.Calendar = google.calendar("v3");

    // JWTの認証を行ってイベントのリストを表示する
    calendar.events.list(
      {
        auth: jwt,
        calendarId: process.env.CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err, res) => {
        if (err) {
          return console.log("APIはエラーを返しました");
        }
        const results = res?.data.items;
        // 取得した予定を格納する
        const events = [];

        if (results?.length) {
          console.log("10の今後の予定");
          results.map((res, i: number) => {
            const start = res.start?.dateTime || res.start?.date;
            console.log(`${start} - ${res.summary}`);
            const a = `${start} - ${res.summary}`;
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
