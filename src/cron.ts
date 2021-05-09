import cron from "node-cron";
import { blecount } from "@/functions/blecount";

cron.schedule("*/10 * * * * *", async () => {
  // BLE接続可能なデバイス数を取得
  const data = await blecount(3);
  console.log(data);
});
