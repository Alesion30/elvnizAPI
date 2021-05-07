import { ReturnData } from "@/typings/status";
import obniz from "@/plugin/obniz";
import { display } from "@/helper/display";

export const sayhello = async (hoge: string): Promise<ReturnData<string>> => {
  // 接続するまで待機 [タイムアウト3秒]
  const connected = await obniz.connectWait({ timeout: 3 });

  if (connected) {
    // ディスプレイにテキストを表示
    const text = `Hello, ${hoge}!!`;
    display(text);

    return {
      success: true,
      data: text,
    };
  } else {
    return {
      success: false,
    };
  }
};
