import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import CommunityCommonModal, { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import RadioButtons from '../atoms/RadioButtons';
import { useState } from 'react';
import { reportComment, reportPost } from '@/api/Community';
import { selectInfoType } from '@/types/common';
import CommunityReportCommonModal from './CommunityReportCommonModal';
import { reportCommentResponseType } from '@/types/community';

export interface DialogBlockDoneProps {
  opened: boolean;
  texts: CommunityPostTextType;
  onClose: () => void;
  selectInfo: selectInfoType;
  identity: string;
  setReportModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setDoneModalMessage: React.Dispatch<React.SetStateAction<any>>;
  selectedtate: {
    selectedOption: any;
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>;
    selectedValue: any;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
  };
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
  setDoneModalMessage,
  selectedtate,
  ...props
}: DialogBlockDoneProps) {
  const { purpose, target_type, idx } = selectInfo;
  const { selectedOption, setSelectedOption, selectedValue, setSelectedValue } = selectedtate;

  function handleChange(option: { index: number; optionIndex: string; content: string }) {
    setSelectedOption(String(option.index));
    setSelectedValue(option.optionIndex);
  }

  const communityDeleteDoneModalProps: CommunityCommonModalProps = {
    title: texts.report,
    withCloseButton: true,
    opened,
    onClose,
    confirmButton: {
      onClick: async () => {
        setReportModalBlock(false);

        if (target_type === 'post') {
          let response = await reportPost(identity, 0, 20, idx, 'report', selectedValue);
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success' ? texts.reported : '이미 신고한 댓글입니다.';
          await setDoneModalMessage(modalMessage);
          await setDoneModalBlock(true);
        }
        if (target_type === 'comment') {
          const response = await reportComment(identity, idx, selectedValue);
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success' ? texts.reported : '이미 신고한 댓글입니다.';
          await setDoneModalMessage(modalMessage);
          await setDoneModalBlock(true);
          await refetch();
        }
      },
      text: texts.reportButton,
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
      <CommunityReportCommonModal {...communityDeleteDoneModalProps}>
        <CommunityModalText
          voteText={
            <>
              <Group spacing={6} position="center" css={{ textAlign: 'left' }}>
                <div css={{ fontSize: 18, fontWeight: 400, color: '#475357', flex: 1 }}>
                  <h4
                    css={{
                      color: '#101010',
                      fontSize: 20,
                      fontWeight: 600,
                      marginBottom: 24,
                    }}
                  >
                    {texts.reportReason}
                  </h4>
                  <RadioButtons
                    target_type={target_type}
                    selectedOption={selectedOption}
                    handleChange={handleChange}
                  />
                  <div
                    css={{
                      marginTop: 45,
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#666',
                      fontWeight: 600,
                      maxWidth: 390,
                      padding: '30px 0 0 0 !important',
                      margin: '0 auto !important',
                    }}
                  >
                    <p>{texts.reportWarning[0]}</p>
                    <p>{texts.reportWarning[1]}</p>
                  </div>
                </div>
              </Group>
            </>
          }
        />
      </CommunityReportCommonModal>
    </>
  );
}

export default CommunityReportModal;
