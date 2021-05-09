import cron from "node-cron";
import { blecount } from "@/functions/bleCount";
import { saveCount } from "@/functions/saveCount";

// BLEデバイス数
let beforeCount = 0;

cron.schedule("*/10 * * * * *", async () => {
  // BLE接続可能なデバイス数を取得
  const count = await blecount(3);

  // デバイス数に変更がある場合、Firestoreに保存
  if (count != beforeCount) {
    await saveCount(count);
  }

  // デバイス数を更新
  beforeCount = count;
});
