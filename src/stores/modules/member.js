import { MEMBER_INVITATION_STATUS_INVITED, MEMBER_INVITATION_STATUS_JOINED } from "../models/member"

export const useMember = () => {
  const { t } = useI18n()

  const MEMBER_INVITATION_STATUS_TEXT = value => ({
    [MEMBER_INVITATION_STATUS_INVITED]: t('YQT7T9hm26PiwFUJvrxSm'),
    [MEMBER_INVITATION_STATUS_JOINED]: t('w_iPwp1wwma-yB2Ly5PW4')
  }[value])

  const MEMBER_INVITATION_STATUS_BADGE = value => ({
    [MEMBER_INVITATION_STATUS_INVITED]: 'processing',
    [MEMBER_INVITATION_STATUS_JOINED]: 'success'
  }[value])
  
  return {
    MEMBER_INVITATION_STATUS_TEXT,
    MEMBER_INVITATION_STATUS_BADGE
  }
}

