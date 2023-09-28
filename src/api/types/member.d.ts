
export interface MemberListItem {
  email: string;
  memberFunction?: {
    ppc: boolean;
    vcc: boolean;
    transfer: boolean;
  };
  uuid: string;
  username: string;
}

export type MemberListType = MemberListItem[];