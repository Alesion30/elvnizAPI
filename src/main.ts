import { PORT } from "@/config";
import app from "@/routes";
import obniz from "@/plugin/obniz";
import "@/cron";

const run = async (): Promise<void> => {
  // 接続するまで待機 [タイムアウト3秒]
  const connected = await obniz.connectWait({ timeout: 3 });
  if (connected) {
    app.listen(PORT);
    console.log(`Server running at ${PORT} > %o`, `http://localhost:${PORT}`);
  } else {
    console.log("Connection with obniz failed...");
  }
};
void run();
