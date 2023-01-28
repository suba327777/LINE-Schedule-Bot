import { MessageEvent, TextEventMessage } from "@line/bot-sdk";
import { lineClient } from "../../constants/line";
import { quickReplyButton } from "../template/button/quickReplyButton";
import { dateButton } from "../template/button/dateButton";
import { listSchduleMessage } from "../template/messages/listSchdule";
import { textMessage } from "../template/text";
import { contextDB, resetDB, scheduleDB } from "../../constants/db";
import { handleText, typeOfSchedule } from "../../constants/enum";

export const textHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage;

    const contextData: Promise<any> = new Promise((resolve) => {
      resolve(contextDB.getData(`/context`));
    });

    const context: any = await contextData;

    switch (text) {
      case "予定":
        await lineClient.replyMessage(event.replyToken, quickReplyButton());
        break;
      case "今日の予定を教えて!":
        await lineClient.replyMessage(
          event.replyToken,
          await listSchduleMessage(typeOfSchedule.today),
        );
        break;
      case "明日の予定を教えて!":
        await lineClient.replyMessage(
          event.replyToken,
          await listSchduleMessage(typeOfSchedule.tomorrow),
        );
        break;
      case "来週の予定を教えて!":
        await lineClient.replyMessage(
          event.replyToken,
          await listSchduleMessage(typeOfSchedule.nextWeek),
        );
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
          await resetDB();
          lineClient.replyMessage(event.replyToken, textMessage("もう一度最初から入力しよう!"));
          break;
        }
        contextDB.push("/context", "");
        break;

      // case "preview":

      default:
        break;
    }
  } catch (_) {
    await resetDB();
    lineClient.replyMessage(event.replyToken, textMessage(handleText.error));
    throw new Error("message text handler");
  }
};
