/* packages */
import { WebhookEvent } from "@line/bot-sdk";
/* lib */
import { lineClient } from "../../constants/line";
/* handler */
import { followHandler } from "./follow";
import { messagesHandler } from "./messages";
/* messages */
import { errorMessage } from "../template/notice-messages/error";

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case "follow":
        return await followHandler(event);
      case "message":
        return await messagesHandler(event);
    }
  } catch (err: unknown) {
    lineClient.pushMessage(event.source.userId!, errorMessage);
    console.log(err);
    throw new Error("handlers");
  }
};
