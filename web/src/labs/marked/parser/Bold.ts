import { marked } from "..";
import Link from "./Link";
import PlainText from "./PlainText";

export const BOLD_REG = /\*\*(.+?)\*\*/;

const matcher = (rawStr: string) => {
  const matchResult = rawStr.match(BOLD_REG);
  return matchResult;
};

const renderer = (rawStr: string): string => {
  const matchResult = matcher(rawStr);
  if (!matchResult) {
    return rawStr;
  }

  const parsedContent = marked(matchResult[1], [], [Link, PlainText]);
  return `<strong>${parsedContent}</strong>`;
};

export default {
  name: "bold",
  regex: BOLD_REG,
  matcher,
  renderer,
};
