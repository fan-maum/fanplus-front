import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import RadioButtons from '../atoms/RadioButtons';
import { useState } from 'react';
import { reportComment, reportPost } from '@/api/Community';
import { selectInfoType } from '@/types/common';

export interface DialogBlockDoneProps {
  opened: boolean;
  texts: CommunityPostTextType;
  onClose: () => void;
  selectInfo: selectInfoType;
  identity: string;
  setReportModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

function CommunityReportModal({
  onClose,
  opened,
  texts,
  selectInfo,
  identity,
  setReportModalBlock,
  setDoneModalBlock,
  refetch,
  ...props
}: DialogBlockDoneProps) {
  const { purpose, target_type, idx } = selectInfo;
  const [selectedOption, setSelectedOption] = useState('1');

  function handleChange(event: any) {
    setSelectedOption(event.target.value);
  }

  const communityDeleteDoneModalProps: CommunityCommonModalProps = {
    title: '신고하기',
    withCloseButton: true,
    opened,
    onClose,
    confirmButton: {
      onClick: async () => {
        setReportModalBlock(false);
        setDoneModalBlock(true);
        if (target_type === 'post') {
          await reportPost(identity, 0, 20, idx, 'report', Number(selectedOption));
          // router.push(`/community/board/${router.query.boardIndex}`);
        }
        if (target_type === 'comment') {
          const type = selectedOption === '1' ? 'spam' : 'bad';
          await reportComment(identity, idx, type);
          await refetch();
        }
      },
      text: '신고',
    },
    styles: (theme) => ({
      content: {
        padding: '30px',
      },
      body: {},
    }),
  };

  return (
    <>
      <CommunityCommonModal {...communityDeleteDoneModalProps}>
        <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center" css={{ textAlign: 'left' }}>
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357' }}>
                  <h4
                    css={{
                      color: '#101010',
                      fontSize: 20,
                      fontWeight: 600,
                      marginBottom: 24,
                    }}
                  >
                    사유선택
                  </h4>
                  <RadioButtons
                    target_type={target_type}
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                  />
                  {
                    <div
                      css={{
                        marginTop: 45,
                        textAlign: 'center',
                        fontSize: 18,
                        color: '#666',
                        fontWeight: 600,
                      }}
                    >
                      <p>허위 신고의 경우 서비스 이용제한과 같은</p>
                      <p>불이익을 받을실 수 있습니다.</p>
                    </div>
                  }
                </div>
                <button></button>
              </Group>
            </>
          }
        />
      </CommunityCommonModal>
    </>
  );
}

export default CommunityReportModal;
