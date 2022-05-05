// Load the Package
import { TextMessage } from "@line/bot-sdk";
import moment from "moment";

// Load the module
import { listEvents } from "../../api/googleCalendar/listEvents";
import { listEventType } from "../../api/googleCalendar/types/listEventType";

export const listSchduleMessage = async (typeOfSchedule: string): Promise<TextMessage> => {
  // 予定の取得
  const schdule: any = await listEvents(typeOfSchedule);

  const data: listEventType = schdule;

  let message = "";

  if (data.length) {
    data.map((res) => {
      const start = moment(res.start?.dateTime);
      // 日付のformat
      const formatStart = start.format("MM月DD日HH時mm分 (ddd)");

      const addMessage = `${formatStart}-${res.summary}`;

      if (message === "") {
        return (message = addMessage);
      } else {
        return (message += "\n\n" + addMessage);
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
