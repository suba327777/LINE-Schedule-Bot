// Load the Package
import { google, Auth, calendar_v3 } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Load the module
import { JwtClient } from "./JwtClient";

export const ListEvents = async (): Promise<any> => {
  try {
    const jwt = await JwtClient();
    const calendar: calendar_v3.Calendar = google.calendar("v3");

    // JWTの認証を行ってイベントのリストを表示する
    const calendars = await calendar.events.list({
      auth: jwt,
      calendarId: process.env.CALENDAR_ID,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const results = calendars?.data.items;

    return results;
  } catch (err: unknown) {
    console.log(err);
  }
};
