import { useEffect } from 'react';
import dayjs from 'dayjs';
import VoteModal from './VoteModal';
import { getCommunityCookie, setCommunityCookie } from '@/utils/communityCookie';
import styled from '@emotion/styled';
import { UrlLangType } from '@/types/common';

type VoteDetailImagePopupProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  language: UrlLangType;
};

const VoteDetailImagePopup = ({
  opened,
  setOpened,
  onClose,
  language,
}: VoteDetailImagePopupProps) => {
  useEffect(() => {
    let VotePopupCount: number | undefined = getCommunityCookie('VotePopupCount');

    const expire = dayjs().startOf('day').add(1, 'day').toDate();

    if (VotePopupCount === undefined) {
      setCommunityCookie('VotePopupCount', 0, { path: '/', expires: expire });
      VotePopupCount = 0;
    }

    if (VotePopupCount < 1) {
      setOpened(true);
    }
  }, []);

  return (
    <VoteModal open={opened} onClose={onClose} position="center">
      <ImagePopupWrapper>
        <img className="image" src={`/images/votes/ticketPopup_${language}.png`} alt="popup" />
        <img
          className="closeButton"
          onClick={() => onClose()}
          src="/icons/icon_close.svg"
          alt="closeButton"
        />
      </ImagePopupWrapper>
    </VoteModal>
  );
};
export default VoteDetailImagePopup;

const ImagePopupWrapper = styled.div`
  position: relative !important;
  width: 370px;
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: inherit;
  bottom: 0px;
  align-items: center;
  background-color: white;
  border-radius: 24px;

  .image {
    width: 100%;
    height: 100%;
  }
  .closeButton {
    position: absolute;
    top: 16px;
    right: 18px;
    cursor: pointer;
  }
`;
