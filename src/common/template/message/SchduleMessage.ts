// Load the Package
import { TextMessage } from "@line/bot-sdk";
import moment from "moment";

// Load the module
import { ListEvents } from "../../calendar/ListEvents";
import { ListEventType } from "../../calendar/types/ListEventType";

export const SchduleMessage = async (
  typeOfSchedule: string
): Promise<TextMessage> => {
  // 予定の取得
  const schdule: any = await ListEvents(typeOfSchedule);

  const data: ListEventType = schdule;

  let message = "";

  if (data.length) {
    data.map((res) => {
      const start = moment(res.start?.dateTime);
      // 日付のformat
      const formatStart = start.format("MM月DD日HH時mm分 (ddd)");

      const addMessage = `${formatStart}-${res.summary}`;

      if (message == "") {
        message = addMessage;
      } else {
        message += "\n\n" + addMessage;
      }
    });
  } else {
    message = "予定はないみたいですね";
  }

  return {
    type: "text",
    text: message,
  };
};
