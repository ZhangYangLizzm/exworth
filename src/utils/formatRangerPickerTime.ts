export const formatRangerPickerTime = (value: Array<any>) => {
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
