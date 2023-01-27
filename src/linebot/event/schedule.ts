import { lineClient } from "../../constants/line";
import { handleText } from "../../constants/enum";
import { listSchduleMessage } from "../template/messages/listSchdule";
import { textMessage } from "../template/text";

const scheduleEvent = async () => {
  try {
    const typeOfSchedule = "tomorrow";
    lineClient.broadcast(await listSchduleMessage(typeOfSchedule));
  } catch {
    await lineClient.broadcast(textMessage(handleText.error));
  }
};

scheduleEvent();
