import { Request } from "@/typings/express";

export const getQuery = (req: Request, key: string): string | null => {
  const val = req.query[key];
  return typeof val === "string" ? val : null;
};
