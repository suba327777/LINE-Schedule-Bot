/* packages */
import moment from "moment";

export const date = (typeOfSchedule: string) => {
  const startDate = moment(new Date());
  const endDate = moment(new Date());

  switch (typeOfSchedule) {
    case "today":
      endDate.endOf("days");
      break;
    case "tomorrow":
      startDate.add(1, "days").startOf("days");
      endDate.add(1, "days").endOf("days");
      break;
    case "nextWeek":
      startDate.add(7, "days").day(1).startOf("days");
      endDate.add(7, "days").day(7).endOf("days");
      break;
  }
  return { startDate, endDate };
};
