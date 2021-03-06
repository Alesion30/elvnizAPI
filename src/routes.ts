import app from "@/plugin/express";
import { Request, Response } from "@/typings/express";
import { sayhello } from "@/functions/hello";
import { getCocoaDeviceCount } from "@/functions/ble";
import { getQuery } from "@/helper/query";
import { getResponse } from "./helper/response";

// エンドポイント
app.get("/", async (req: Request, res: Response) => {
  // クエリパラメータからテキストを取得
  const qname = getQuery(req, "name");
  const name: string = qname ?? "World";

  // ディスプレイに出力
  const data = await sayhello(name);

  const responseData = getResponse(data);
  return res.status(responseData.status).json(responseData);
});
app.get("/ble", async (req: Request, res: Response) => {
  // クエリパラメータから待ち時間を取得
  const qwait = getQuery(req, "wait");
  let wait = parseInt(qwait);
  if (isNaN(wait) || wait <= 0) {
    wait = 10;
  }

  // BLE接続可能なデバイス数を取得
  const data = await getCocoaDeviceCount(wait);

  const responseData = getResponse(data);
  return res.status(responseData.status).json(responseData);
});

export default app;
