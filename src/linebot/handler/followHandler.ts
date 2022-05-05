/* packages */
import { FollowEvent } from "@line/bot-sdk";
/* lib */
import { lineClient } from "../../lib/line";
/* message */
import { followMessage } from "../template/notice-messages/followMessage";

export const followHandler = async (event: FollowEvent): Promise<void> => {
  await lineClient.replyMessage(event.replyToken, followMessage);
};
