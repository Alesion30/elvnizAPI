import { display } from "@/helper/display";
import obniz from "@/plugin/obniz";
import { BleScanTarget, BleScanSetting } from "@/typings/obniz";

export const blecount = async (wait: number = 10): Promise<number> => {
  await obniz.ble.initWait();
  display(`Please wait ${wait} seconds.`);

  // 接触確認アプリ「COCOA」 ServiceUUID
  // https://blog.google/documents/58/Contact_Tracing_-_Bluetooth_Specification_v1.1_RYGZbKW.pdf
  const target: BleScanTarget = {
    uuids: ["FD6F"],
  };
  const setting: BleScanSetting = {
    duration: wait,
    duplicate: false,
  };

  // スキャン開始
  const peripherals = await obniz.ble.scan.startAllWait(target, setting);

  // peripherals.forEach((peripheral) => {
  //   console.log(peripheral.rssi);
  // });
  const count = peripherals.filter((peripheral) => peripheral.rssi >= -70)
    .length; // 通信強度を-70dB以上のみカウント
  display(`count: ${count}`);

  // スキャン終了
  obniz.ble.scan.endWait();
  return count;
};
