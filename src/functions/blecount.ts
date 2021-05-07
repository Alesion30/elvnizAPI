import { display } from "@/helper/display";
import obniz from "@/plugin/obniz";
import { BleScanTarget, BleScanSetting } from "@/typings/obniz";

export const blecount = async (wait: number = 10): Promise<number> => {
  await obniz.ble.initWait();
  display(`Please wait ${wait} seconds.`);

  const target: BleScanTarget = {};
  const setting: BleScanSetting = {
    duration: wait,
    duplicate: false,
  };
  const peripherals = await obniz.ble.scan.startAllWait(target, setting);
  obniz.ble.scan.endWait();
  return peripherals.length;
};
