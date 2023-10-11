const useMerchantCheckStatus = () => {
  const { t } = useI18n();

  const StatusMap: Record<string, string> = {
    0: "资料未提交",
    1: "審核通過",
    2: "审核失败",
    3: "资料已提交",
  };

  const getStatusLabel = (status: number) => StatusMap[status];

  const statusOptions = Object.entries(StatusMap).map(([value, label]) => ({
    value,
    label,
  }));

  return { getStatusLabel,statusOptions };
};

export { useMerchantCheckStatus };
