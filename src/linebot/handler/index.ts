import { WebhookEvent } from "@line/bot-sdk";
import { followHandler } from "./follow";
import { messagesHandler } from "./messages";
import { postbackHandler } from "./postback";

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case "follow":
        return await followHandler(event);
      case "message":
        return await messagesHandler(event);
      case "postback": {
        const dateTime: any = event.postback.params!;
        return postbackHandler(dateTime.datetime, event.replyToken);
      }
    }
  } catch (_) {
    throw new Error("handlers");
  }
};
