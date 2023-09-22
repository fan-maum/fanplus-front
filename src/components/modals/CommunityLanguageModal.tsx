import { BoardLangType } from '@/types/common';
import { Divider, Modal, ModalProps } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { Stack } from '../atoms';
import { useRouter } from 'next/router';
import { setBoardLangCookie } from '@/utils/setLangCookie';

type textType = {
  modalHeader: string;
  modalExplain: string;
  current: string;
  ALL: string;
  ko: string;
  en: string;
  ja: string;
  zh: string;
  es: string;
  vi: string;
  id: string;
  zhtw: string;
};

type propTypes = {
  texts: textType;
  opened: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  boardLang: BoardLangType;
  setBoardLanguage: Dispatch<SetStateAction<BoardLangType>>;
};

const CommunityLanguageModal = ({
  texts,
  setModal,
  boardLang,
  setBoardLanguage,
  opened,
  ...props
}: propTypes) => {
  const modalProps: ModalProps = {
    styles: () => ({
      content: {
        borderRadius: 24,
        transitionDuration: '500ms !important',
        flexBasis: '640px !important',
      },
      header: {
        padding: '14px 18px',
        svg: {
          width: '20px !important',
          height: '20px !important',
        },
      },
      body: { padding: '0px' },
    }),
    centered: true,
    zIndex: 200000,
    opened: opened,
    onClose: () => setModal(false),
    ...props,
  };
  const router = useRouter();
  const onClickLanguageBox = (language: BoardLangType) => {
    setBoardLanguage(language);
    setBoardLangCookie(language);
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, page: 1, boardLang: language },
    });
    setModal(false);
  };
  return (
    <Modal {...modalProps} css={{ width: '500px' }}>
      <Divider color="#f1f1f1" size="2px" />
      <Stack p="16px" spacing="6px" css={{ fontSize: '14px' }}>
        <h2 css={{ fontWeight: '500' }}>{texts?.modalHeader}</h2>
        <p css={{ color: '#999' }}>{texts.modalExplain}</p>
        <Stack spacing="8px" direct="row" justify="center" css={{ margin: '12px 0px 6px' }}>
          <ModalLanguageBox
            language={texts.ALL}
            current={texts.current}
            isCurrent={boardLang === 'ALL'}
            onClick={() => onClickLanguageBox('ALL')}
          />
          <div css={{ width: '75%', '@media (max-width: 768px)': { width: '48%' } }} />
        </Stack>
        <Stack spacing="8px" direct="row" justify="center" css={{ flexWrap: 'wrap' }}>
          <ModalLanguageBox
            language={texts.ko}
            current={texts.current}
            isCurrent={boardLang === 'ko'}
            onClick={() => onClickLanguageBox('ko')}
          />
          <ModalLanguageBox
            language={texts.en}
            current={texts.current}
            isCurrent={boardLang === 'en'}
            onClick={() => onClickLanguageBox('en')}
          />
          <ModalLanguageBox
            language={texts.zh}
            current={texts.current}
            isCurrent={boardLang === 'zh'}
            onClick={() => onClickLanguageBox('zh')}
          />
          <ModalLanguageBox
            language={texts.zhtw}
            current={texts.current}
            isCurrent={boardLang === 'zhtw'}
            onClick={() => onClickLanguageBox('zhtw')}
          />
          <ModalLanguageBox
            language={texts.ja}
            current={texts.current}
            isCurrent={boardLang === 'ja'}
            onClick={() => onClickLanguageBox('ja')}
          />
          <ModalLanguageBox
            language={texts.es}
            current={texts.current}
            isCurrent={boardLang === 'es'}
            onClick={() => onClickLanguageBox('es')}
          />
          <ModalLanguageBox
            language={texts.vi}
            current={texts.current}
            isCurrent={boardLang === 'vi'}
            onClick={() => onClickLanguageBox('vi')}
          />
          <ModalLanguageBox
            language={texts.id}
            current={texts.current}
            isCurrent={boardLang === 'id'}
            onClick={() => onClickLanguageBox('id')}
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CommunityLanguageModal;

const ModalLanguageBox = ({
  language,
  current,
  isCurrent,
  onClick,
}: {
  language: string;
  current: string;
  isCurrent: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      css={{
        border: '1.5px solid transparent',
        backgroundImage: isCurrent
          ? 'linear-gradient(#fff, #fff), linear-gradient(104deg, #ff5656 7.74%, #ef30ba 96.35%)'
          : 'linear-gradient(#fff, #fff), linear-gradient(#999, #999)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        borderRadius: '8px',
        padding: '6px',
        minHeight: '57px',
        width: '24%',
        '@media (max-width: 768px)': { width: '48%' },
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <h3 css={{ fontSize: '16px', fontWeight: '500' }}>{language}</h3>
      {isCurrent && (
        <p css={{ color: '#999', wordBreak: 'keep-all', marginTop: '2px' }}>{current}</p>
      )}
    </div>
  );
};
