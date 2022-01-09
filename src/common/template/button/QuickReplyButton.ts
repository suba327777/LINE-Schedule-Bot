// load the package
import { QuickReply, TextMessage } from "@line/bot-sdk";

export const QuickReplyButton = (): TextMessage => {
  return {
    type: "text",
    text: "いつの予定が知りたいですか?",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "今日の予定を教えて!",
            text: "今日の予定を教えて!",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "明日の予定を教えて!",
            text: "明日の予定を教えて!",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "来週の予定を教えて!",
            text: "来週の予定を教えて!",
          },
        },
      ],
    },
  };
};
