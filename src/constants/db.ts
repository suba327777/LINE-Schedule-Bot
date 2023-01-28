import { Config, JsonDB } from "node-json-db";

export const contextDB = new JsonDB(new Config("db/contextDB.json", true, true, "/"));
export const scheduleDB = new JsonDB(new Config("db/scheduleDB.json", true, true, "/"));

export const resetDB = async () => {
  await contextDB.push("/context", { name: "", date: "" });
  await scheduleDB.push("/schedule", { name: "", date: "" });
};
