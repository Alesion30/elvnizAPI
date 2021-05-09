import { OBNIZ_ID } from "@/config";
import { db } from "@/plugin/firebase";

export const saveCount = async (count: number) => {
  const data = { id: OBNIZ_ID, people: count };
  await db.collection("elevators").doc("left").set(data, { merge: true });
};
