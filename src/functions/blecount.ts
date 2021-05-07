import { display } from "@/helper/display";
import obniz from "@/plugin/obniz";
import { BleScanTarget, BleScanSetting } from "@/typings/obniz";
import { ReturnData } from "@/typings/status";

export const blecount = async (
  wait: number = 10
): Promise<ReturnData<number>> => {
  // 接続するまで待機 [タイムアウト3秒]
  const connected = await obniz.connectWait({ timeout: 3 });

  if (connected) {
    await obniz.ble.initWait();
    display(`Please wait ${wait} seconds.`);

    const target: BleScanTarget = {};
    const setting: BleScanSetting = {
      duration: wait,
      duplicate: false,
    };
    const peripherals = await obniz.ble.scan.startAllWait(target, setting);
    obniz.ble.scan.endWait();
    return {
      success: true,
      data: peripherals.length,
    };
  } else {
    return {
      success: false,
    };
  }
};
