import type { selectInfoType } from '@/types/common';
import type { UserResponseType } from '@/types/community';
import { SetterOrUpdater } from 'recoil';

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
  await (isComment && setCheckComment && setCheckComment(isComment));
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

export const getProfileData = (user: UserResponseType | null) => {
  const profile = {
    profileImg: user
      ? user?.RESULTS.DATAS.PROFILE_IMG_URL
      : 'http://cdnetphoto.appphotocard.com/profile_images/profile_image_default.png',
    profileNick: user ? user?.RESULTS.DATAS.NICK : '',
  };
  return profile;
};
