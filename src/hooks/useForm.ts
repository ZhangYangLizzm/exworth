import { validateOptions } from "ant-design-vue/es/form/useForm";
import { useForm as useAntForm } from "ant-design-vue/lib/form";
import { pick, toArray } from "lodash-es";

export const useForm = (formState: any, rules: any) => {
  const { validate, resetFields, mergeValidateInfo, validateInfos } =
    useAntForm(formState, rules);

  const handleValidate = (
    namelist?: Array<string>,
    options?: validateOptions
  ):Promise<any> =>
    new Promise(async (resolve) => {
      try {
        const values = await validate(namelist, options);
        resolve({ values, err: undefined });
      } catch (err) {
        resolve({ values: undefined, err });
      }
    });

  const mergeValidateInfoByKeys = (keys = []) => {
    const temp = mergeValidateInfo(toArray(pick(validateInfos, keys)));
    temp.help = temp.help?.[0] ? [temp.help?.[0]] : undefined;
    return temp;
  };

  return {
    validate,
    validateInfos,
    resetFields,
    mergeValidateInfo,
    mergeValidateInfoByKeys,
    handleValidate,
  };
};
