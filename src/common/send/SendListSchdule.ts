// Load the package
import { Client, WebhookEvent } from "@line/bot-sdk";

// Load the module
import { ErrorMessage } from "../template/message/ErrorMessage";
import { QuickReplyButton } from "../template/button/QuickReplyButton";
import { ListSchduleMessage } from "../template/message/LIstSchduleMessage";

export const SendListSchdule = async (
  client: Client,
  event: WebhookEvent
): Promise<void> => {
  try {
    // メッセージ受信の場合とテキストメッセージの場合
    if (event.type !== "message" || event.message.type !== "text") {
      return;
    }
    // メッセージ関連変数の処理
    const { replyToken } = event;
    const { text } = event.message;

    let typeOfSchedule = "";
    if (text === "予定") {
      // Reply
      await client.replyMessage(replyToken, QuickReplyButton());
    } else if (text === "今日の予定を教えて!") {
      typeOfSchedule = "today";
      const message = await ListSchduleMessage(typeOfSchedule);
      await client.replyMessage(replyToken, message);
    } else if (text === "明日の予定を教えて!") {
      typeOfSchedule = "tomorrow";
      const message = await ListSchduleMessage(typeOfSchedule);
      await client.replyMessage(replyToken, message);
    } else if (text === "来週の予定を教えて!") {
      typeOfSchedule = "nextWeek";
      const message = await ListSchduleMessage(typeOfSchedule);
      await client.replyMessage(replyToken, message);
    } else {
      await client.replyMessage(replyToken, ErrorMessage());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};
