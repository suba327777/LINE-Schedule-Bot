import { MessageEvent } from "@line/bot-sdk";
import { textHandler } from "./text";

export const messagesHandler = async (event: MessageEvent): Promise<void> => {
  try {
    switch (event.message.type) {
      case "text":
        return await textHandler(event);
    }
  } catch (_) {
    throw new Error("messages handler");
  }
};
