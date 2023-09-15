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

export const encryptNo = (num = 5, replacer = "*") =>
  new Array(num + 1).join(replacer);

export const Format = (
  value: number,
  num = 2,
  encrypt = { num: 2, replacer: "" }
) => {
  return isNaN(value)
    ? encryptNo(encrypt.num, encrypt.replacer)
    : padZero(NumberFormat(value), num);
};
