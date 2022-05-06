/* packages */
import { MessageEvent, TextEventMessage } from "@line/bot-sdk";
/* lib */
import { lineClient } from "../../../constants/line";
import { quickReplyButton } from "../../template/button/quickReplyButton";
/* notice-messages */
import { listSchduleMessage } from "../../template/notice-messages/listSchdule";

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage;
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
    }
  } catch (err) {
    console.log(err);
    throw new Error("message text handler");
  }
};
