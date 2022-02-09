// Load the Package
import { google, Auth, calendar_v3 } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// Load the module
import { JwtClient } from "./JwtClient";
import moment from "moment";

export const ListEvents = async (typeOfSchedule: string): Promise<any> => {
  try {
    const jwt = await JwtClient();
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
      calendarId: process.env.CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const results = calendars?.data.items;

    return results;
  } catch (err: unknown) {
    console.log(err);
  }
};
