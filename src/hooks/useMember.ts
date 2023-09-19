export const MEMBER_INVITATION_STATUS_INVITED = "pending";
export const MEMBER_INVITATION_STATUS_ACCEPTED = "accepted";
export const MEMBER_INVITATION_STATUS_JOINED = "completed";

export const useMember = () => {
  const { t } = useI18n();

  const MEMBER_INVITATION_STATUS_TEXT = (value: string | number) =>
    ({
      [MEMBER_INVITATION_STATUS_INVITED]: t("YQT7T9hm26PiwFUJvrxSm"),
      [MEMBER_INVITATION_STATUS_JOINED]: t("w_iPwp1wwma-yB2Ly5PW4"),
      [MEMBER_INVITATION_STATUS_ACCEPTED]: t("Iisyekt19U48nfo2BFypV"),
    }[value]);

  const MEMBER_INVITATION_STATUS_BADGE = (value: string | number) =>
    ({
      [MEMBER_INVITATION_STATUS_INVITED]: "processing",
      [MEMBER_INVITATION_STATUS_ACCEPTED]: "warning",
      [MEMBER_INVITATION_STATUS_JOINED]: "success",
    }[value]);

  const MEMBER_INVITATION_STATUS_COLOR = (value: string) => {
    if (value === MEMBER_INVITATION_STATUS_INVITED) {
      return {
        backgroundColor: "rgb(73, 182, 245,0.1)",
        color: "rgb(73, 182, 245,1)",
      };
    } else if (value === MEMBER_INVITATION_STATUS_ACCEPTED) {
      return {
        backgroundColor: "rgb(203,180,0,0.1)",
        color: "rgb(203,180,0)",
      };
    } else if (value === MEMBER_INVITATION_STATUS_JOINED) {
      return { backgroundColor: "rgb(89,200,83,0.1)", color: "rgb(89,200,83)" };
    }
  };

  return {
    MEMBER_INVITATION_STATUS_TEXT,
    MEMBER_INVITATION_STATUS_BADGE,
    MEMBER_INVITATION_STATUS_COLOR,
  };
};
