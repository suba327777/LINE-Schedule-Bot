import { TemplateMessage } from "@line/bot-sdk";

export const dateButton = (): TemplateMessage => {
  return {
    type: "template",
    altText: "button",
    template: {
      type: "buttons",
      title: "時間を指定してね",
      text: "please select",
      actions: [
        {
          type: "datetimepicker",
          label: "指定する",
          mode: "datetime",
          data: "datetime",
        },
        {
          type: "message",
          label: "やっぱりやめる",
          text: "reset",
        },
      ],
    },
  };
};
