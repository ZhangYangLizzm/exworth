import { useRequest } from "@/hooks/useRequest";
import { MemberListType } from "./types/member";
const { request } = useRequest("/api/member");


export const loadMember = (params: any,controller?:AbortController): Promise<ExResponse<MemberListType>> =>
  request({
    url: "member",
    params,
    signal: controller?.signal,
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

export const searchMemberByCardNo = (
  params: any,
  type: "PPC" | "VCC",
  controller:AbortController
): Promise<ExResponse<any>> =>
  request({
    url: `member${type}`,
    params,
    signal: controller?.signal,
  });
