import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectInfoState } from '@/store/community';
import { Group } from '../atoms';
import { CommunityPostTextType } from '@/types/textTypes';
import { CommunityCommonModalProps } from './CommunityCommonModal';
import CommunityModalText from '../molecules/CommunityModalText';
import RadioButtons from '../atoms/RadioButtons';
import { reportComment, reportPost } from '@/api/Community';
import CommunityReportCommonModal from './CommunityReportCommonModal';

export interface DialogBlockDoneProps {
  opened: boolean;
  texts: CommunityPostTextType;
  onClose: () => void;
  identity: string;
  setReportModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setDoneModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setDoneModalMessage: React.Dispatch<React.SetStateAction<any>>;
}

function CommunityReportModal({
  onClose,
  opened,
  texts,
  identity,
  setReportModalBlock,
  setDoneModalBlock,
  refetch,
  setDoneModalMessage,
  ...props
}: DialogBlockDoneProps) {
  const selectInfo = useRecoilValue(selectInfoState);
  const [selectedOption, setSelectedOption] = useState('1');
  const [selectedValue, setSelectedValue] = useState<any>();
  const { purpose, target_type, idx } = selectInfo;

  function handleChange(option: { index: number; optionIndex: string; content: string }) {
    setSelectedOption(String(option.index));
    setSelectedValue(option.optionIndex);
  }

  const CommunityReportCommonModalProps: CommunityCommonModalProps = {
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
            response?.data?.RESULTS?.MSG === 'success' ? texts.reported : texts.alreadyReportedPost;
          await setDoneModalMessage(modalMessage);
          await setDoneModalBlock(true);
        }
        if (target_type === 'comment') {
          const response = await reportComment(identity, idx, selectedValue);
          let modalMessage =
            response?.data?.RESULTS?.MSG === 'success'
              ? texts.reported
              : texts.alreadyReportedComment;
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
      <CommunityReportCommonModal {...CommunityReportCommonModalProps}>
        <CommunityModalText
          text={
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
                    texts={texts}
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
