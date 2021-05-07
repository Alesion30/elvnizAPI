import obniz from "@/plugin/obniz";
import { display } from "@/helper/display";

export const sayhello = async (hoge: string): Promise<string> => {
  const text = `Hello, ${hoge}!!`;
  display(text);
  return text;
};
