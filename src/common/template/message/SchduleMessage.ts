// Load the Package
import { TextMessage } from "@line/bot-sdk";
import moment from "moment";

// Load the module
import { ListEvents } from "../../calendar/ListEvents";
import { ListEventType } from "../../calendar/types/ListEventType";

export const SchduleMessage = async (): Promise<TextMessage> => {
  // 予定の取得
  const schdule: any = await ListEvents();

  const data: ListEventType = schdule;

  return {
    type: "text",
    text: JSON.stringify(
      data.map((res) => {
        if (res === undefined) {
          return "予定はないみたいですね";
        }
        const start = moment(res.start?.dateTime);
        // 日付のformat
        const formatStart = start.format("MM月DD日HH時mm分");

        const message = `${formatStart}-${res.summary}`;

        return message;
      }),
      null,
      2
    ),
  };
};
