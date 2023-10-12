const useMerchantCheckStatus = () => {
  const { t } = useI18n();

  const StatusMap: Record<string, string> = {
    0: "资料未提交",
    1: "審核通過",
    2: "审核失败",
    3: "资料已提交",
  };
  
  const StatusClassMap: Record<string, string> = {
    0: "text-warning",
    1: "text-primary",
    2: "text-danger",
    3: "text-pending",
  }
  const getStatusLabel = (status: number) => StatusMap[status];

  const getStatusClass = (status: number) => StatusClassMap[status];

  const statusOptions = Object.entries(StatusMap).map(([value, label]) => ({
    value,
    label,
  }));

  return { getStatusLabel,statusOptions,getStatusClass };
};

export { useMerchantCheckStatus };
