import { useRecoilValue } from 'recoil';
import { checkCommentState, selectInfoState } from '@/store/community';
import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityModalText from '../molecules/CommunityModalText';
import { postBlockUser } from '@/api/Community';
import CommunityBlockUserCommonModal, {
  CommunityBlockUserCommonModalProps,
} from './CommunityBlockUserCommonModal';
import ToastModal from '../toast/ToastModal';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useUrlLanguage } from '@/hooks/useLanguage';

export interface BlockUserModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
  user_id: string;
  user_idx: string;
  setBlockUserModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalMessage: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
  replyRefetch: () => void;
}

function CommunityBlockUserModal({
  onClose,
  opened,
  texts,
  user_id,
  user_idx,
  setBlockUserModalBlock,
  setDoneModalBlock,
  setDoneModalMessage,
  refetch,
  replyRefetch,
  ...props
}: BlockUserModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const selectInfo = useRecoilValue(selectInfoState);
  const modalText1 = texts.askBlockUser[0];
  const modalText2 = texts.askBlockUser[1];
  const { purpose, target_type, idx } = selectInfo;
  const reloadRouterUrl = router.query.from ? router.query.from : router.query.boardIndex;

  const communityBlockUserModalProps: CommunityBlockUserCommonModalProps = {
    buttonId: 'modalBlockUserButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: async () => {
        setBlockUserModalBlock(false);
        let response = await postBlockUser(user_id, user_idx, Number(idx));
        let modalMessage =
          response?.data?.RESULTS?.MSG === 'success' ? texts.blockedUser : texts.alreadyBlockUser;
        if (target_type === 'post') {
          queryClient.invalidateQueries(['communityBoardData']);
          ToastModal.alert(modalMessage);
          reloadRouterUrl === 'community'
            ? router.push(`/${urlLang}/community`)
            : router.push(`/${urlLang}/community/board/${reloadRouterUrl}`);
        }
        if (target_type === 'comment') {
          refetch();
          replyRefetch();
          ToastModal.alert(modalMessage);
        }
      },
      text: texts.confirmButton,
    },
  };

  return (
    <>
      <CommunityBlockUserCommonModal {...communityBlockUserModalProps}>
        <CommunityModalText
          text={
            <>
              <Group spacing={6} position="center" css={{ flexDirection: 'column' }}>
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  <p>{modalText1}</p>
                  <p>{modalText2}</p>
                </div>
                <div css={{ width: '80%', fontSize: 14, fontWeight: 500, color: '#999' }}>
                  {texts.askBlockUser[2]}
                </div>
              </Group>
            </>
          }
        />
      </CommunityBlockUserCommonModal>
    </>
  );
}

export default CommunityBlockUserModal;
