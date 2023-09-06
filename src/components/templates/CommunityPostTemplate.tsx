import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityPostResponseType,
  TopicListItemType,
} from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import type { BackLangType } from '@/types/common';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import CommunityBoardTopNavi from '../molecules/CommunityBoardTopNavi';
import CommunityBoardArticle from '../molecules/CommunityBoardArticle';
import CommunityBoardPagination from '../organisms/CommunityBoardPagination';
import IconWrite from '../atoms/IconWrite';
import IconPopularBlack from '../atoms/IconPopularBlack';
import IconMyPost from '../atoms/IconMyPost';
import IconPopular from '../atoms/IconPopular';
import CommunityLanguageModal from '../modals/CommunityLanguageModal';
import CommunityPostTopNavi from '../molecules/community/CommunityPostTopNavi';

// TODO 1. 각 게시글 실제 link 연결 (경은님과 함께 해야함) (하단 탭바의 글쓰기 링크도 연결해야함)

export type CommunityPostPropType = {
  communityPostData: CommunityPostResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({ communityPostData, texts }: CommunityPostPropType) => {
  const router = useRouter();
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const commentList = communityPostData.RESULTS.DATAS.COMMENT_LIST;
  const headList = communityPostData.RESULTS.DATAS.HEAD_LIST;
  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
      }}
    >
      <CommunityPostTopNavi />
      <div>게시글 정보</div>
      <div>게시글 내용</div>
      <div>댓글</div>
      <div>댓글입력 및 공유 Bottom Bar</div>
    </div>
  );
};

export default CommunityPostTemplate;
