import { convert, stringToCode, urlEncode } from "encoding-japanese";

/**
 * 文字列をShift-JISでURLエンコードします。
 * @param query エンコードする文字列
 * @returns Shift-JISでURLエンコードされた文字列
 */
export const sjisEncodeUriComponent = (query: string) => {
  const unicodeQuery = stringToCode(query);
  const sjisQuery = convert(unicodeQuery, "SJIS", "UNICODE");
  return urlEncode(sjisQuery);
};
