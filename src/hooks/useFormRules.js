export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const useFormRules = () => {
  const { t } = useI18n();

  const CurrencyRule = [
    { required: true, message: t("QzD6F1l8Ue9UNPMHcBruL") },
  ];
  
  function amountValidator(available) {
    return async (_, value) => {
      if (value < 0) {
        return Promise.reject(t("GyCej78V5rwpEJ-WJaZhi"));
      } else if (value > available) {
        return Promise.reject(t("7JHpXFtB2h5hL2P-P9Zuy"));
      }
      return Promise.resolve();
    };
  }

  const getAmountRule = (available) => {
    return [
      { required: true, message: t("MOVz2c0LFUl1-TpkPHZ22") },
      {
        validator: amountValidator(available),
        trigger: "change",
      },
    ];
  };

  const SecurityPasswordRule = [
    { required: true, message: t("L8_JRGabLnJGC2tBI9Hqc") },
    {
      len: 6,
      message: t("3cYIleQFlnfyyw5ivRtvs"),
    },
  ];

  const GoogleAuthCodeRule = [
    { required: true, message: t("RN0u-0ie4LuZ1u5aetix9") },
    {
      len: 6,
      message: t("3cYIleQFlnfyyw5ivRtvs"),
    },
  ];

  const EmailRule = [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { pattern: emailPattern, message: "Invalid email format" },
  ];

  const CardNoRule = [{ required: true, message: t("9X7FO5do5O5FIYhSXc5FG") }];

  const UUIDRule = [{ required: true, message: t("PzLfqlyITUMV-LKoIdqWR") }];

  const NetworkRule = [{ required: true, message: t("KbcfSX5ia5pOmBlREN6PC") }];

  const AddressRule = [{ required: true, message: t("_skPFb-gpUBUTW-epVro7") }];

  return {
    NetworkRule,
    AddressRule,
    UUIDRule,
    CurrencyRule,
    getAmountRule,
    SecurityPasswordRule,
    GoogleAuthCodeRule,
    EmailRule,
    CardNoRule,
  };
};

export default useFormRules;
