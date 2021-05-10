import { OBNIZ_ID } from "@/config";
import { db } from "@/plugin/firebase";

const elevatorsCollection = db.collection("elevators");

export const saveCount = async (count: number) => {
  const data = { id: OBNIZ_ID, people: count };
  await elevatorsCollection.doc("left").set(data, { merge: true });
};
