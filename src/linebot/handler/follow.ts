import { FollowEvent } from "@line/bot-sdk";
import { lineClient } from "../../constants/line";
import { handleText } from "../template/messages/enum";
import { textMessage } from "../template/messages/text";

export const followHandler = async (event: FollowEvent): Promise<void> => {
  await lineClient.replyMessage(event.replyToken, textMessage(handleText.follow));
};
