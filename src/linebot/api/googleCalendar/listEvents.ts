/* packages */
import { google, calendar_v3 } from "googleapis";
/* constants */
import { CALENDAR_ID } from "../../../constants/secrets";
/* utils */
import { date } from "../../../utils/date";
/* jwt */
import { jwtClient } from "./jwtClient";

export const listEvents = async (schedule: string): Promise<any> => {
  try {
    const jwt = await jwtClient();
    const calendar: calendar_v3.Calendar = google.calendar("v3");
    const day = date(schedule);

    // JWTの認証を行ってイベントのリストを表示する
    const calendars = await calendar.events.list({
      auth: jwt,
      calendarId: CALENDAR_ID,
      timeMin: day.startDate.toISOString(),
      timeMax: day.endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const results = calendars?.data.items;

    return results;
  } catch (_) {
    throw new Error("listEvents");
  }
};
