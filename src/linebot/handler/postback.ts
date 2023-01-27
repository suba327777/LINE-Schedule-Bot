import { resetDB, scheduleDB } from "../../constants/db";

export const postbackHandler = async (dateTime: string) => {
  try {
    const scheduleData: Promise<any> = new Promise((resolve) => {
      resolve(scheduleDB.getData(`/schedule`));
    });
    const schedule: any = await scheduleData;
    if (schedule) {
      scheduleDB.push("/schedule", schedule + dateTime);
    }
  } catch (_) {
    await resetDB();
    throw new Error("postback handler");
  }
};
