// Load the package
import { TextMessage } from "@line/bot-sdk";

// TODO  flexMessageにしてメッセージを見やすくする
export const ErrorMessage = (): TextMessage => {
  return {
    type: "text",
    text: "このメッセージは未対応です\nこちらがテンプレになります\n・予定教えて\n 予定を教えてくれる",
  };
};
