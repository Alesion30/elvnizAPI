import app from "@/plugin/express";
import obniz from "@/plugin/obniz";
import { Request, Response } from "@/typings/express";
import { sayhello } from "@/functions/hello";
import { blecount } from "@/functions/blecount";
import { display } from "@/helper/display";
import { getQuery } from "@/helper/query";
import { getResponse } from "./helper/response";

obniz.onconnect = async function () {
  await obniz.ble.initWait();
  obniz.ble.advertisement.setAdvData({
    serviceUuids: ["1234"],
  });

  obniz.ble.advertisement.setScanRespData({
    localName: "obniz BLE",
  });

  obniz.ble.advertisement.start();
};

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
  const data = await blecount(wait);
  display(`count: ${data}`);

  const responseData = getResponse(data);
  return res.status(responseData.status).json(responseData);
});

export default app;
