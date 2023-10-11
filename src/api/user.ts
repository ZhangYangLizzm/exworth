import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api/ppc");

export const getUserList = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "cardHolder/manage/getList",
    params,
  });
