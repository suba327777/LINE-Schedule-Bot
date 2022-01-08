// Load the package
import { Client, WebhookEvent } from "@line/bot-sdk";

// Load the module
import { ErrorMessage } from "../template/ErrorMessage";

export const SendMessage = async (
  client: Client,
  event: WebhookEvent
): Promise<void> => {
  try {
    // すべてのイベントの処理
    if (event.type !== "message" || event.message.type !== "text") {
      return;
    }
    // メッセージ関連変数の処理
    const { replyToken } = event;
    const { text } = event.message;

    if (text === "予定教えて") {
      // Reply
    } else {
      await client.replyMessage(replyToken, ErrorMessage());
    }
  } catch (e: unknown) {
    console.log(e);
  }
};
