import cron from "node-cron";
import { getCocoaDeviceCount } from "@/functions/ble";
import {
  saveCount,
  resetElevatorCount,
  resetAllFloorsState,
} from "@/functions/firestore";

// BLEデバイス数
let beforeCount = -1;

// 10秒おきにBLEスキャンを実行
cron.schedule("*/10 * 7-23 * * 1-6", async () => {
  // COCOAインストール数を取得
  const count = await getCocoaDeviceCount(2);

  // デバイス数に変更がある場合、Firestoreに保存
  if (count != beforeCount) {
    await saveCount(count);
  }

  // デバイス数を更新
  beforeCount = count;
});

// 1分おきに状態をリセット
cron.schedule("* * * * *", async () => {
  console.log("Reset!!");
  // await resetElevatorCount();
  await resetAllFloorsState();
});
