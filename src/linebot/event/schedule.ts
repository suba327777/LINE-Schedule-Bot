import { lineClient } from "../../constants/line";
import { handleText } from "../template/messages/enum";
import { listSchduleMessage } from "../template/messages/listSchdule";
import { textMessage } from "../template/messages/text";

const scheduleEvent = async () => {
  try {
    const typeOfSchedule = "tomorrow";
    lineClient.broadcast(await listSchduleMessage(typeOfSchedule));
  } catch {
    await lineClient.broadcast(textMessage(handleText.error));
  }
};

scheduleEvent();
