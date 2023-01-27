import { WebhookEvent } from "@line/bot-sdk";
import { lineClient } from "../../constants/line";
import { handleText } from "../template/messages/enum";
import { textMessage } from "../template/messages/text";
import { followHandler } from "./follow";
import { messagesHandler } from "./messages";

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case "follow":
        return await followHandler(event);
      case "message":
        return await messagesHandler(event);
    }
  } catch (err: unknown) {
    lineClient.pushMessage(event.source.userId!, textMessage(handleText.error));
    throw new Error("handlers");
  }
};
