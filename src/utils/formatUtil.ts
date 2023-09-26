import { encryptNo } from "./encrypt";

export const FormatRangerPickerTime = (value: Array<any>) => {
  if (!value) {
    return value;
  }
  return value.map((item, index) => {
    if (index === 0) {
      return item + "T00:00:00.000Z";
    } else {
      return item + "T23:59:59.772Z";
    }
  });
};


export const Format = (
  value: number,
  num = 2,
  encrypt = { num: 2, replacer: "" }
) => {
  return isNaN(value)
    ? encryptNo(encrypt.num, encrypt.replacer)
    : padZero(NumberFormat(value), num);
};

export const NumberFormat = (value: number) => {
  if (!value) {
    return "0";
  }
  const temp = value.toString().split(".");
  const intPartFormat =
    temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") +
    (temp[1] ? `.${temp[1]}` : ""); // 将整数部分逢三一断
  return intPartFormat;
};

export const padZero = (value = "0", num = 2) => {
  if (value === null) {
    return "0";
  }
  if (num === 0) {
    return value;
  }
  const index = value.toString().indexOf(".");
  let zero = "";
  for (let i = 0; i < num; i++) {
    zero += "0";
  }
  if (index > 0) {
    return `${value}${zero}`.substr(0, index + num + 1);
  } else {
    return `${value}.${zero}`;
  }
};
 