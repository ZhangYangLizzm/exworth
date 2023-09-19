interface RuleOpions {
  available?: ComputedRef<number>;
  secretKeyType?: Ref<string>;
}

export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

export const md5_pattern = /^[a-f0-9]{32}$/i;
export const rsa_pattern =
  /^-----BEGIN PUBLIC KEY-----(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?)-----END PUBLIC KEY-----$/;

const secretKeyPattern: Record<string, RegExp> = {
  md5: md5_pattern,
  rsa: rsa_pattern,
};
export const useFormRules = (options: RuleOpions={}) => {
  const { t } = useI18n();

  const CurrencyRule = [
    { required: true, message: t("QzD6F1l8Ue9UNPMHcBruL") },
  ];

  function amountValidator() {
    return async (_: any, value: number) => {
      if (value < 0) {
        return Promise.reject(t("GyCej78V5rwpEJ-WJaZhi"));
      } else if (value > unref(options.available!)) {
        return Promise.reject(t("7JHpXFtB2h5hL2P-P9Zuy"));
      }
      return Promise.resolve();
    };
  }

  const AmountRule = [
    { required: true, message: t("MOVz2c0LFUl1-TpkPHZ22") },
    {
      validator: amountValidator(),
      trigger: "change",
    },
  ];

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

  function secretKeyValidator() {
    const pattern = secretKeyPattern[unref(options.secretKeyType!)];
    return async (_: any, value: string) => {
      if (pattern.test(value)) {
        return Promise.resolve(value);
      }
      return Promise.reject("密鑰格式不符");
    };
  }
  const secretKeyRule = [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    {
      validator: secretKeyValidator(),
      trigger: "change",
    },
  ];
  return {
    NetworkRule,
    AddressRule,
    UUIDRule,
    CurrencyRule,
    AmountRule,
    SecurityPasswordRule,
    GoogleAuthCodeRule,
    EmailRule,
    CardNoRule,
    secretKeyRule
  };
};

export default useFormRules;
