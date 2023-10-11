import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api");

export const getChannelList = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "agent",
    params,
  });

