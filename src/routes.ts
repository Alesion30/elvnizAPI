import app from "@/plugin/express";
import { Request, Response } from "@/typings/express";
import { sayhello } from "@/functions/sample";
import { blecount } from "@/functions/blecount";
import { display } from "@/helper/display";
import { getQuery } from "@/helper/query";

// エラーメッセージ
const errorMessage = "Connection with obniz failed...";

// エンドポイント
app.get("/", async (req: Request, res: Response) => {
  // クエリーパラメータから値を取得
  const qname = getQuery(req, "name");
  const name: string = qname ?? "World";

  // ディスプレイに出力
  const { success, data } = await sayhello(name);
  if (success) {
    res.send(data);
  } else {
    res.status(500).send(errorMessage);
  }
});
app.get("/ble", async (req: Request, res: Response) => {
  // クエリーパラメータから待ち時間を取得
  const qwait = getQuery(req, "wait");
  let wait = parseInt(qwait);
  if (isNaN(wait) || wait <= 0) {
    wait = 10;
  }

  // BLE接続可能なデバイス数を取得
  const { success, data } = await blecount(wait);
  if (success) {
    display(`count: ${data}`);
    res.send(`count: ${data}`);
  } else {
    res.status(500).send(errorMessage);
  }
});

export default app;
