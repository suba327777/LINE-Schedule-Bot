// Load the package
import { Client, WebhookEvent } from "@line/bot-sdk";

// Load the module
import { ErrorMessage } from "../template/ErrorMessage";
import { QuickReplyButton } from "../template/button/QuickReplyButton";

export const SendMessage = async (
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

    if (text === "予定") {
      // Reply
      await client.replyMessage(replyToken, QuickReplyButton());
    } else {
      await client.replyMessage(replyToken, ErrorMessage());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};
