/* packages */
import { TextMessage } from "@line/bot-sdk";

export const errorMessage: TextMessage = {
  type: "text",
  text: "エラーが発生しました",
};
