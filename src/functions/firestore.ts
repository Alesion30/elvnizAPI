import { OBNIZ_ID } from "@/config";
import { db } from "@/plugin/firebase";

const elevatorsCollection = db.collection("elevators");
const floorsCollection = db.collection("floors");

export const saveCount = async (count: number) => {
  const data = { id: OBNIZ_ID, people: count, updated: new Date() };
  await elevatorsCollection.doc("left").set(data, { merge: true });
};

export const resetElevatorCount = async () => {
  await elevatorsCollection.doc("left").set({ people: -1 }, { merge: true });
  await elevatorsCollection.doc("right").set({ people: -1 }, { merge: true });
};

export const resetAllFloorsState = async () => {
  const querySnapshot = await floorsCollection.get();
  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    const congestion = parseInt(data["congestion"]);
    if (congestion !== 0) {
      await floorsCollection.doc(doc.id).set({ congestion: 0 }, { merge: true });
    }
  });
};
