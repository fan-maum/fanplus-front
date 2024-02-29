import type {
  BestPostsResponseType,
  BookmarksResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
  EditBoardArticleResponseType,
  EditorImageUploadResponseType,
  EditorImageUrlResponseType,
  MainPageNoticesResponseType,
  MultiBoardsInquiryResponseType,
  PostBoardArticleResponseType,
  PostResponseType,
  Top50PopularBoardsResponseType,
  UserResponseType,
  blockUserListType,
  sideMenuResponseType,
} from '@/types/community';
import axios, { AxiosResponse } from 'axios';
import type { BoardLangType, OrderType, ServerLangType, UrlLangType } from '@/types/common';
import type { BestPostsViewType } from '@/components/molecules/community/BestNotices';
import { APIServer } from './Instance';

/**
 * 단일 게시판 게시글리스트 조회
 */
export const getCommunityBoardData = async (
  userId: string | null,
  boardType: number | string,
  page: number,
  perPage: number,
  lang: ServerLangType,
  filterLang: BoardLangType,
  viewType: string,
  topic: number | '',
  maxPage: number
) => {
  if (topic === 0) topic = '';
  const queries = { page, perPage, lang, filterLang, viewType, 'topicIds[]': topic, maxPage };
  const queriesWithUserId = { ...queries, identity: userId };
  const response: AxiosResponse = await APIServer.get(`/posts/${boardType}`, {
    params: userId ? queriesWithUserId : queries,
  });

  return response.data;
};

/**
 * 단일 게시판 토픽리스트 조회
 */
export const getCommunityBoardTopics = async (boardIndex: number, lang: ServerLangType) => {
  const response: AxiosResponse<CommunityBoardTopicResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/topics`,
    { params: { lang } }
  );
  return response.data;
};

/**
 * 검색페이지 - 카테고리 조회
 */
export const getCommunityBoardCategoryData = async (lang: ServerLangType) => {
  const response: AxiosResponse = await APIServer.get('/voteWeb/search/category', {
    params: { lang },
  });
  return response.data;
};

/**
 * 검색페이지 - 단일 카테고리 리스트 조회
 * @description APIServer X
 */
export const getCommunityBoardResultData = async (
  category_type: number,
  searchValue: any,
  lang: ServerLangType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/searchBoardResult`,
    { params: { category_type, searchValue, lang, page, per_page } }
  );
  return response.data;
};

/**
 * 팬픽 페이지 - 슬라이드 배너 공지 리스트 조회
 */
export const getCommunityNoticeBannerData = async (boardIndex: number, lang: ServerLangType) => {
  const response: AxiosResponse<CommunityNoticeBannerResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/banners`,
    { params: { lang } }
  );
  return response.data;
};

/**
 * 상세게시글 조회
 */
export const getCommunityPostData = async (
  boardIndex: number,
  postIndex: number,
  identity: string | null,
  lang: ServerLangType
) => {
  const response: AxiosResponse<PostResponseType> = await APIServer.get(
    `/voteWeb/boards/${boardIndex}/posts/${postIndex}/detail`,
    { params: identity ? { identity, lang } : { lang } }
  );
  return response.data;
};

/**
 * 상세게시글 삭제
 * @description APIServer X
 */
export const deletePost = async (identity: string, post_idx: string, mode: 'reset' | 'remove') => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/deletePost?identity=${identity}&post_idx=${post_idx}&mode=${mode}`,
    {
      data: {
        identity: identity,
        post_idx: post_idx,
        mode: mode,
      },
    }
  );
  return response;
};

/**
 * 댓글 조회
 */
export const getComments = async (
  postIndex: number,
  identity: string | null,
  lang: BoardLangType,
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(`/api/community/comment`, {
    params: { postIndex, identity, lang, order_by, page, per_page },
  });
  return response.data;
};

export const postComment = async (
  identity: string,
  target_type: string,
  target: number,
  contents: string | number
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postComment`,
    {
      identity: identity,
      target_type: target_type,
      target: target,
      contents: contents,
    }
  );
  return response.data;
};

export const deleteComment = async (identity: string, comment_idx: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postComment?comment_idx=${comment_idx}`,
    {
      data: {
        identity: identity,
        comment_idx: comment_idx,
      },
    }
  );
  return response;
};

export const getReplies = async (
  commentIndex: number,
  identity: string | null,
  board_lang: BoardLangType,
  order_by: OrderType,
  page: number,
  per_page: number
) => {
  const response: AxiosResponse = await axios.get(`/api/community/reply`, {
    params: { commentIndex, identity, board_lang, order_by, page, per_page },
  });
  return response.data;
};

/**
 * Likes
 */
/* 좋아요 */
export const postLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/likes/${commentIndex}`,
    {
      identity: identity,
    }
  );
  return response;
};

export const deleteLikes = async (commentIndex: string, identity: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/likes/${commentIndex}`,
    {
      data: {
        identity: identity,
      },
    }
  );
  return response;
};

/**
 * Recommend
 */
/* 추천 */
export const postRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/recommends`,
    {
      identity: identity,
      post_idx: post_idx,
    }
  );
  return response;
};

export const deleteRecommends = async (identity: string, post_idx: string) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/recommends?post_idx=${post_idx}`,
    {
      data: {
        identity: identity,
        post_idx: post_idx,
      },
    }
  );
  return response;
};

/**
 * Editor
 */
/* board article posting 하기 */
export const postBoardArticle = async (
  userId: string,
  boardIndex: number,
  lang: ServerLangType,
  topicIndex: number,
  title: string,
  contents: string,
  attachmentIds: string[]
) => {
  const resposne: AxiosResponse<PostBoardArticleResponseType> = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/postBoardArticle`,
    { userId, boardIndex, lang, topicIndex, title, contents, attachmentIds }
  );
  return resposne.data;
};

export const editBoardArticle = async (
  userId: string,
  postIndex: number,
  lang: ServerLangType,
  topicIndex: number,
  title: string,
  contents: string
) => {
  const response: AxiosResponse<EditBoardArticleResponseType> = await axios.put(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editBoardArticle`,
    { userId, postIndex, lang, title, contents, topicIndex }
  );
  return response.data;
};

export const getFileUploadUrl = async () => {
  const response: AxiosResponse<EditorImageUrlResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editorFileUploadUrl`
  );
  return response.data;
};

export const uploadEditorFile = async (
  userId: string,
  fileName: string,
  fileType: string,
  uploadKey: string,
  postIndex?: number
) => {
  const response: AxiosResponse<EditorImageUploadResponseType> = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/editorFileUpload`,
    { userId, fileName, fileType, uploadKey, postIndex }
  );
  return response.data;
};

/**
 * Report
 */
/* 신고 */
export const reportPost = async (
  identity: string,
  page: number,
  per_page: number,
  post_idx: string,
  mode: 'recommend' | 'report',
  report_type: number
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/reportPost?identity=${identity}&page=${page}&per_page=${per_page}`,
    {
      identity: identity,
      post_idx: post_idx,
      mode: mode,
      report_type: report_type,
    }
  );

  return response;
};

export const reportComment = async (
  identity: string,
  comment_idx: string,
  report_type: 'spam' | 'bad'
) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/reportComment`,
    {
      identity: identity,
      comment_idx: comment_idx,
      report_type: report_type,
    }
  );

  return response;
};

/**
 * User
 */
/* 유저정보 */
export const getUser = async (identity?: string, user_idx?: string) => {
  const response: AxiosResponse<UserResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/user`,
    { params: { user_idx, identity } }
  );

  return response.data;
};

/**
 * TOP50 인기 게시판
 */
export const getTop50PopularBoards = async (lang: ServerLangType) => {
  const response: AxiosResponse<Top50PopularBoardsResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/PopularTop50`,
    { params: { lang } }
  );
  return response.data;
};

/**
 * Best 인기글 게시판
 */
export const getBestPosts = async (lang: ServerLangType, viewType: BestPostsViewType) => {
  const response: AxiosResponse<BestPostsResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/bestPosts`,
    { params: { lang, viewType } }
  );
  return response.data;
};

/**
 * Bookmark
 */
export const getBookmarks = async (identity: string, lang: UrlLangType) => {
  const response: AxiosResponse<BookmarksResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/bookmarks`,
    { params: { identity, lang } }
  );
  return response.data;
};

/**
 * 전체 공지
 */
export const getMainPageNotices = async (collectionId: number) => {
  const response: AxiosResponse<MainPageNoticesResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/mainpageNotices`,
    { params: { collectionId } }
  );
  return response.data;
};

export const postBookmark = async (identity: string, menuId: number) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/bookmark`,
    {
      identity,
      menuId,
    }
  );
  return response;
};

export const deleteBookmark = async (identity: string, menuId: number) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/bookmark?menuId=${menuId}`,
    {
      data: {
        identity,
        menuId,
      },
    }
  );
  return response;
};

/**
 * @desc 다중 게시판 조회
 * @param boardIds 빈 배열 / undefined 모두 가능
 */
export const getMultiBoardsInquiry = async (
  identity: string,
  lang: ServerLangType,
  boardIds: Array<string | number>
) => {
  const response: AxiosResponse<MultiBoardsInquiryResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/multiBoardsInquiry`,
    { params: { identity, lang, boardIds }, paramsSerializer: { indexes: null } }
  );
  return response.data;
};

/* sideMenus + Menus */
export const getSideMenu = async (lang: ServerLangType, identity: string) => {
  const response: AxiosResponse<sideMenuResponseType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/sideMenu`,
    { params: { lang, identity } }
  );
  return response.data;
};

/* Block User */
export const getBlockUsers = async (
  userId: string,
  user_idx: number,
  position: number,
  count: number
) => {
  const response: AxiosResponse<blockUserListType> = await axios.get(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/blockUsers`,
    { params: { userId, user_idx, position, count } }
  );
  return response.data;
};

export const postBlockUser = async (user_id: string, user_idx: string, targetUserIdx: number) => {
  const response: AxiosResponse = await axios.post(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/blockUser`,
    {
      identity: user_id,
      user_idx: user_idx,
      targetUserIdx: targetUserIdx,
    }
  );
  return response;
};

export const deleteBlockUser = async (user_id: string, user_idx: string, targetUserIdx: number) => {
  const response: AxiosResponse = await axios.delete(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/blockUser?targetUserIdx=${targetUserIdx}`,
    {
      data: {
        identity: user_id,
        user_idx: user_idx,
        targetUserIdx: targetUserIdx,
      },
    }
  );
  return response;
};
