import { FollowEvent } from "@line/bot-sdk";
import { lineClient } from "../../constants/line";
import { handleText } from "../../constants/enum";
import { textMessage } from "../template/text";

export const followHandler = async (event: FollowEvent): Promise<void> => {
  try {
    await lineClient.replyMessage(event.replyToken, textMessage(handleText.follow));
  } catch (_) {
    throw new Error("follow handler");
  }
};
