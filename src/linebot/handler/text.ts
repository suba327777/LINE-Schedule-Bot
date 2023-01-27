/* packages */
import { MessageEvent, TextEventMessage } from "@line/bot-sdk";
import { lineClient } from "../../constants/line";
import { quickReplyButton } from "../template/button/quickReplyButton";
import { dateButton } from "../template/button/dateButton";
import { listSchduleMessage } from "../template/messages/listSchdule";
import { textMessage } from "../template/text";
import { contextDB, resetDB, scheduleDB } from "../../constants/db";

export const textHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage;

    const contextData: Promise<any> = new Promise((resolve) => {
      resolve(contextDB.getData(`/context`));
    });

    const context: any = await contextData;

    let typeOfSchedule = "";

    switch (text) {
      case "予定":
        await lineClient.replyMessage(event.replyToken, quickReplyButton());
        break;
      case "今日の予定を教えて!":
        typeOfSchedule = "today";
        await lineClient.replyMessage(event.replyToken, await listSchduleMessage(typeOfSchedule));
        break;
      case "明日の予定を教えて!":
        typeOfSchedule = "tomorrow";
        await lineClient.replyMessage(event.replyToken, await listSchduleMessage(typeOfSchedule));
        break;
      case "来週の予定を教えて!":
        typeOfSchedule = "nextWeek";
        await lineClient.replyMessage(event.replyToken, await listSchduleMessage(typeOfSchedule));
        break;
      case "登録":
        lineClient.replyMessage(event.replyToken, textMessage("予定を追加してね!"));
        await contextDB.push(`/context`, "registerMode");
    }

    switch (context) {
      case "registerMode":
        await scheduleDB.push("/schedule", text);
        lineClient.replyMessage(event.replyToken, dateButton());
        await contextDB.push("/context", "date");
        break;

      case "date":
        if (text) {
          resetDB();
          break;
        }

        contextDB.push("/context", "");
        break;

      default:
        break;
    }
  } catch (_) {
    await resetDB();
    throw new Error("message text handler");
  }
};
