import cron from "node-cron";
import { getCocoaDeviceCount } from "@/functions/ble";
import { saveCount } from "@/functions/firestore";

// BLEデバイス数
let beforeCount = -1;

cron.schedule("*/10 * * * * *", async () => {
    // BLE接続可能なデバイス数を取得
    const count = await getCocoaDeviceCount(2);

    // デバイス数に変更がある場合、Firestoreに保存
    if (count != beforeCount) {
        await saveCount(count);
    }

    // デバイス数を更新
    beforeCount = count;
});

cron.schedule("* * * * *", async () => {
    console.log('state reset');
});
