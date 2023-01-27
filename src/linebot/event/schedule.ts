/* constants */
import { lineClient } from "../../constants/line";
/* notice-message */
import { errorMessage } from "../template/messages/error";
import { listSchduleMessage } from "../template/messages/listSchdule";

const scheduleEvent = async () => {
  try {
    const typeOfSchedule = "tomorrow";
    lineClient.broadcast(await listSchduleMessage(typeOfSchedule));
  } catch {
    await lineClient.broadcast(errorMessage);
  }
};

scheduleEvent();
