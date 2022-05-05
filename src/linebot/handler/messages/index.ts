/* packages */
import { MessageEvent } from "@line/bot-sdk";
/* hamdler */
import { messageTextHandler } from "./text";

export const messagesHandler = async (event: MessageEvent): Promise<void> => {
  try {
    switch (event.message.type) {
      case "text":
        return await messageTextHandler(event);
    }
  } catch (err: unknown) {
    console.log(err);
    throw new Error("messages handler");
  }
};
