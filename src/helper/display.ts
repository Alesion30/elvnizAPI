import obniz from "@/plugin/obniz";

export const display = (text: string): void => {
  obniz.display.clear();
  obniz.display.print(text);
  console.log(text);
};
