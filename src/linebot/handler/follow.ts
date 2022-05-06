/* packages */
import { FollowEvent } from "@line/bot-sdk";
/* constants */
import { lineClient } from "../../constants/line";
/* message */
import { followMessage } from "../template/notice-messages/follow";

export const followHandler = async (event: FollowEvent): Promise<void> => {
  await lineClient.replyMessage(event.replyToken, followMessage);
};
