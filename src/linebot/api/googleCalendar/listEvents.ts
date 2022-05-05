/* packages */
import { google, calendar_v3 } from "googleapis";
import moment from "moment";
/* lib */
import { CALENDAR_ID } from "../../../lib/secrets";
/* jwt */
import { jwtClient } from "./jwtClient";

export const listEvents = async (typeOfSchedule: string): Promise<any> => {
  try {
    const jwt = await jwtClient();
    const calendar: calendar_v3.Calendar = google.calendar("v3");

    let startDate = moment(new Date());
    let endDate = moment(new Date());

    switch (typeOfSchedule) {
      case "today":
        endDate.endOf("days");
        break;
      case "tomorrow":
        startDate.add(1, "days").startOf("days");
        endDate.add(1, "days").endOf("days");
        break;
      case "nextWeek":
        startDate.add(7, "days").day(1).startOf("days");
        endDate.add(7, "days").day(7).endOf("days");
        break;
    }

    // JWTの認証を行ってイベントのリストを表示する
    const calendars = await calendar.events.list({
      auth: jwt,
      calendarId: CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const results = calendars?.data.items;

    return results;
  } catch (err: unknown) {
    console.log(err);
    throw new Error("googleCalendar");
  }
};
