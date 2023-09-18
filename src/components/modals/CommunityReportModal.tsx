import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import RadioButtons from '../atoms/RadioButtons';
import { useState } from 'react';

export interface DialogBlockDoneProps {
  opened: boolean;
  texts: CommunityPostTextType;
  onClose: () => void;
}

function CommunityReportModal({ onClose, opened, texts, ...props }: DialogBlockDoneProps) {
  const communityDeleteDoneModalProps: CommunityCommonModalProps = {
    title: '신고하기',
    withCloseButton: true,
    opened,
    onClose,
    confirmButton: {
      onClick: onClose,
      //   text: texts.confirmButton,
      text: '신고',
    },
    styles: (theme) => ({
      content: {
        padding: '30px',
      },
      body: {},
    }),
  };
  const [selectedOption, setSelectedOption] = useState('option1');

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

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
                  <RadioButtons selectedOption={selectedOption} handleChange={handleChange} />
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
