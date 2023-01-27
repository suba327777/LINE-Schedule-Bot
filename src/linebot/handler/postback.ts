import { resetDB, scheduleDB } from "../../constants/db";
import { handleText } from "../../constants/enum";
import { lineClient } from "../../constants/line";
import { textMessage } from "../template/text";

export const postbackHandler = async (dateTime: string, replyToken: string) => {
  try {
    const scheduleData: Promise<any> = new Promise((resolve) => {
      resolve(scheduleDB.getData(`/schedule`));
    });
    const schedule: any = await scheduleData;
    if (schedule) {
      scheduleDB.push("/schedule", schedule + dateTime);
    }
  } catch (_) {
    await resetDB();
    lineClient.replyMessage(replyToken, textMessage(handleText.error));
    throw new Error("postback handler");
  }
};
