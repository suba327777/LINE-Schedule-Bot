/* packages */
import moment from "moment";
import { typeOfSchedule } from "../constants/enum";

export const date = (schedule: string) => {
  const startDate = moment(new Date());
  const endDate = moment(new Date());

  switch (schedule) {
    case typeOfSchedule.today:
      endDate.endOf("days");
      break;
    case typeOfSchedule.tomorrow:
      startDate.add(1, "days").startOf("days");
      endDate.add(1, "days").endOf("days");
      break;
    case typeOfSchedule.nextWeek:
      startDate.add(7, "days").day(1).startOf("days");
      endDate.add(7, "days").day(7).endOf("days");
      break;
  }
  return { startDate, endDate };
};
