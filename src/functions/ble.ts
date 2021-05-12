import { display } from "@/helper/display";
import obniz from "@/plugin/obniz";
import { BleScanTarget, BleScanSetting } from "@/typings/obniz";

export const getCocoaDeviceCount = async (
  wait: number = 10
): Promise<number> => {
  await obniz.ble.initWait();
  console.log(`Please wait ${wait} seconds.`);
  // display(`Please wait ${wait} seconds.`);

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

  // 通信強度を取得
  const rssiList = peripherals.map((peripheral) => peripheral.rssi + 100);
  rssiList.sort((a, b) => (a < b ? 1 : -1));

  // 通信強度-70dB以上のみカウント
  const count = rssiList.filter((rssi) => rssi >= 30).length;

  // カウントと通信強度をディスプレイに表示
  let rssiText = "";
  rssiList.forEach((rssi, index) => {
    if (index !== peripherals.length - 1) {
      rssiText += `${rssi},`;
    } else {
      rssiText += `${rssi}`;
    }
  });
  display(`count: ${count}\n${rssiText}`);

  // スキャン終了
  obniz.ble.scan.endWait();
  return count;
};
