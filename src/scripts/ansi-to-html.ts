import Converter from "ansi-to-html";

const converter = new Converter();

export function ansiToHtml(text: string) {
  return converter.toHtml(text);
}