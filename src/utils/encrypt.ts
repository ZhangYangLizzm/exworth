export const encryptNo = (num = 5, replacer = "*") =>
  new Array(num + 1).join(replacer);

export const encryptedEmail = (email: string) => {
  if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
    const str = email.split("@");
    return `${str[0].replace(
      str[0].length > 4 ? /^(.{2}).*.(.{2})/ : /^(.{1}).*.(.{1})/,
      "$1****$2"
    )}@${str[1]}`;
  } else {
    return "";
  }
};

export const encryptStr = (
  str: any,
  prefix = 4,
  suffix = 4,
  replacer = "········"
) => {
  return str
    .toString()
    .replace(
      new RegExp(`^(.{${prefix}}).*(.{${suffix}})`, "g"),
      `$1${replacer}$2`
    );
};
