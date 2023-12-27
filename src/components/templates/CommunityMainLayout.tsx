import { MouseEventHandler, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { UrlLangType } from '@/types/common';
import Layout from '../organisms/Layout';
import MainAsideUserCard from '../organisms/community/MainAsideUserCard';
import styled from '@emotion/styled';
import MainAsideCategory from '../organisms/community/MainAsideCategory';
import BestNotices from '../molecules/community/BestNotices';
import CommunityBoardSearchInputWrapper from '../organisms/community/CommunityBoardSearchInputWrapper';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import CommunityEditorCommonModal from '../modals/CommunityEditorModal';
import { communityPostEditorTexts } from '@/texts/communityPostEditorTexts';

interface CommunityMainLayoutProps {
  urlLang: UrlLangType;
  mode?: string | undefined;
  children: ReactNode;
}

const CommunityMainLayout = ({ urlLang, mode, children }: CommunityMainLayoutProps) => {
  const router = useRouter();
  const isCommunity = router.route === '/[locale]/community';
  const isSearch = router.route === '/[locale]/community/search';
  const isPostDetail = '/[locale]/community/board/[boardIndex]/[postIndex]';
  const isMyPost = '/[locale]/community/myPost';
  const isWrite = '/[locale]/community/board/[boardIndex]/write';
  const isNoSearchInput =
    router.route === isPostDetail || router.route === isMyPost || router.route === isWrite;

  const texts = communityMainPageTexts[urlLang];
  const modalTexts = communityPostEditorTexts[urlLang];
  const searchTabState = useState(texts.allCategory);

  const [cancelModal, setCancelModal] = useState(false);

  const onClickExit = () => {
    setCancelModal(false);
    // router.back();
  };

  const onClickCancel = () => {
    setCancelModal(true);
  };

  return (
    <Layout urlLang={urlLang}>
      <LayoutWrapper>
        <div className="contents">
          <div className="mainAside">
            <MainAsideUserCard urlLang={urlLang} mode={mode} onClickCancel={onClickCancel} />
            <MainAsideCategory urlLang={urlLang} mode={mode} onClickCancel={onClickCancel} />
          </div>
          <div className="mainContent">
            {!isNoSearchInput && (
              <CommunityBoardSearchInputWrapper searchTabState={searchTabState} texts={texts} />
            )}
            <div className="contentLayout">
              <div css={{ width: 810, minWidth: 810 }}>{children}</div>
              {!isCommunity && !mode && <BestNotices />}
            </div>
          </div>
        </div>
      </LayoutWrapper>
      <CommunityEditorCommonModal
        texts={{
          main: modalTexts.modal[mode === 'CREATE' ? 'cancelUpload' : 'cancelEdit'],
          sub: mode === 'CREATE' ? modalTexts.modal.cancelUploadSub : '',
        }}
        cancelButton={{ text: modalTexts.modal.cancel, onClick: () => setCancelModal(false) }}
        confirmButton={{ text: modalTexts.modal.check, onClick: onClickExit }}
        opened={cancelModal}
        onClose={() => setCancelModal(false)}
      />
    </Layout>
  );
};

export default CommunityMainLayout;

const LayoutWrapper = styled.div`
  .contents {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
  }
  .mainAside {
    width: 230px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .mainContent {
    .contentLayout {
      display: flex;
      gap: 20px;
    }
    padding-left: 20px;
    max-width: calc(100% - 230px);
  }
  @media (max-width: 768px) {
    padding-top: 0;
    padding-bottom: 50px;

    > .side-menu {
      display: none;
    }

    > .content {
      max-width: 100%;
      padding-left: 0;
    }
  }
`;
