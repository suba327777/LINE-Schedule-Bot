/* credential */
import credentials from "../../credentials.json";
/* packages */
import dotenv from "dotenv";
dotenv.config();

/* line */
export const LINE_MESSAGING_CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN || "";
export const LINE_MESSAGING_CHANNEL_SECRET = process.env.CHANNEL_SECRET || "";
/* googleCalendar */
export const CALENDAR_ID = process.env.CALENDAR_ID;
/* redential */
export const EMAIL = credentials.client_email;
export const KEY = credentials.private_key;
