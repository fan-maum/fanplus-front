import { useRecoilValue } from 'recoil';
import { checkCommentState, selectInfoState } from '@/store/community';
import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityModalText from '../molecules/CommunityModalText';
import { deleteComment, deletePost } from '@/api/Community';
import CommunityBlockUserCommonModal, {
  CommunityBlockUserCommonModalProps,
} from './CommunityBlockUserCommonModal';
import ToastModal from '../toast/ToastModal';

export interface BlockUserModalProps {
  opened: boolean;
  onClose: () => void;
  texts: CommunityPostTextType;
  identity: string;
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
  identity,
  setBlockUserModalBlock,
  setDoneModalBlock,
  setDoneModalMessage,
  refetch,
  replyRefetch,
  ...props
}: BlockUserModalProps) {
  const selectInfo = useRecoilValue(selectInfoState);
  const { purpose, target_type, idx } = selectInfo;
  const modalText1 = texts.askBlockUser[0];
  const modalText2 = texts.askBlockUser[1];

  const checkComment = useRecoilValue(checkCommentState);

  const communityBlockUserModalProps: CommunityBlockUserCommonModalProps = {
    buttonId: 'modalBlockUserButton',
    opened,
    onClose,
    cancelButton: { text: texts.cancelButton, onClick: onClose },
    confirmButton: {
      onClick: async () => {
        setBlockUserModalBlock(false);
        if (target_type === 'post') {
          // let response = await deletePost(identity, idx, 'remove');
          // let modalMessage =
          //   response?.data?.RESULTS?.MSG === 'success' ? texts.postDeleted : texts.alreadyDeleted;
          // toast open
          ToastModal.alert('회원을 차단하였습니다.');
        }
        if (target_type === 'comment') {
          // let response = await deleteComment(identity, idx);
          // let modalMessage =
          //   response?.data?.RESULTS?.MSG === '삭제 성공'
          //     ? texts.commentDeleted
          //     : texts.alreadyDeleted;
          // checkComment ? refetch() : replyRefetch();
          // toast open
          ToastModal.alert('회원을 차단하였습니다.');
        }
        ToastModal.alert('회원을 차단하였습니다.');
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
                <div css={{ fontSize: 14, fontWeight: 500, color: '#999' }}>
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
