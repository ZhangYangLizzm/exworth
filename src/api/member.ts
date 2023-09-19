import { useRequest } from "@/hooks/useRequest";
const { request } = useRequest("/api/member");

export interface MemberListItem {
  email: string;
  memberFunction: {
    ppc: boolean;
    vcc: boolean;
    transfer: boolean;
  };
  uuid: string;
}

export type MemberListType = MemberListItem[];

export const loadMember = (params: any): Promise<ExResponse<MemberListType>> =>
  request({
    url: "member",
    params,
  });
export const loadMemberInfo = (params: any): Promise<ExResponse<any>> =>
  request({
    url: `member/proUID`,
    params,
  });

export const postMemberInvite = (data: any): Promise<ExResponse<any>> =>
  request({
    url: "invite",
    data,
    method: "post",
  });

export const loadInvitation = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "invitation",
    params,
  });

export const loadMemberPhysicalCard = (params: any): Promise<ExResponse<any>> =>
  request({
    url: `ppc/cards`,
    params,
  });

export const loadMemberVirtualCard = (params: any): Promise<ExResponse<any>> =>
  request({
    url: "credit/list",
    params,
  });
