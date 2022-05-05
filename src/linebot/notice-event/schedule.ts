/* lib */
import { lineClient } from "../../lib/line";
/* notice-message */
import { errorMessage } from "../template/notice-messages/error";
import { listSchduleMessage } from "../template/notice-messages/listSchdule";

const scheduleEvent = async () => {
  try {
    const typeOfSchedule = "tomorrow";
    lineClient.broadcast(await listSchduleMessage(typeOfSchedule));
  } catch {
    await lineClient.broadcast(errorMessage);
  }
};

scheduleEvent();
