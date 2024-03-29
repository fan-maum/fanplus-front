import type { UrlLangType, selectInfoType } from '@/types/common';
import type { UserResponseType } from '@/types/community';
import { NextRouter } from 'next/router';
import { SetterOrUpdater } from 'recoil';
import { getCookie } from './Cookie';

interface showModalOnClickProps extends selectInfoType {
  isComment?: boolean;
  setCheckComment?: SetterOrUpdater<boolean>;
  setModalBlock: SetterOrUpdater<boolean>;
  setSelectInfo: SetterOrUpdater<selectInfoType>;
}

interface showReportModalBlockOnClickProps extends selectInfoType {
  setReportModalBlock: SetterOrUpdater<boolean>;
  setSelectInfo: SetterOrUpdater<selectInfoType>;
}

interface showBlockUserModalBlockOnClickProps extends selectInfoType {
  isComment?: boolean;
  setCheckComment?: SetterOrUpdater<boolean>;
  setBlockUserModalBlock: SetterOrUpdater<boolean>;
  setSelectInfo: SetterOrUpdater<selectInfoType>;
}

export const showModalOnClick = async ({
  purpose,
  target_type,
  idx,
  setModalBlock,
  setSelectInfo,
  ...props
}: showModalOnClickProps) => {
  const { isComment, setCheckComment } = props;
  await setModalBlock(true);
  await setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
  await (isComment !== undefined && setCheckComment !== undefined && setCheckComment(isComment));
};

export const showReportModalBlockOnClick = async ({
  purpose,
  target_type,
  idx,
  setReportModalBlock,
  setSelectInfo,
}: showReportModalBlockOnClickProps) => {
  await setReportModalBlock(true);
  await setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
};

export const showBlockUserModalBlockOnClick = async ({
  purpose,
  target_type,
  idx,
  setBlockUserModalBlock,
  setSelectInfo,
  ...props
}: showBlockUserModalBlockOnClickProps) => {
  const { isComment, setCheckComment } = props;
  await setBlockUserModalBlock(true);
  await setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
  await (isComment !== undefined && setCheckComment !== undefined && setCheckComment(isComment));
};

export const getProfileData = (user: UserResponseType | null) => {
  const profile = {
    profileImg: user
      ? user?.RESULTS.DATAS.PROFILE_IMG_URL
      : 'http://cdnetphoto.appphotocard.com/profile_images/profile_image_default.png',
    profileNick: user ? user?.RESULTS.DATAS.NICK : '',
  };
  return profile;
};

type onClickWriteProps = {
  router: NextRouter;
  urlLang: UrlLangType;
  setPermissionModal: SetterOrUpdater<boolean>;
};

export const onClickWrite = ({ router, urlLang, setPermissionModal }: onClickWriteProps) => {
  const writeBanBoard = ['139', '192', '220'];
  const userId = getCookie('user_id');
  const user_idx = getCookie('user_idx');
  const isAdminAccount = user_idx === process.env.NEXT_PUBLIC_ADMIN_ACCOUNT_IDX;
  const boardType = Number(router.query.boardIndex);
  const writeBanned = writeBanBoard.includes(String(boardType));

  if (writeBanned && !isAdminAccount) {
    setPermissionModal(true);
    return;
  }
  if (!userId) {
    const path = router.asPath;
    router.push({ pathname: '/login', query: { nextUrl: path } });
    return;
  }
  router.push({
    pathname: `/${urlLang}/community/board/${boardType}/write`,
    query: { topic: router.query.topic },
  });
};
