import { deleteBlockUser } from '@/api/Community';
import { UnstyledButton } from '@/components/atoms';
import ToastModal from '@/components/toast/ToastModal';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { blockUserListItemType } from '@/types/community';
import { getCookie } from '@/utils/Cookie';
import { formatOnlyDate } from '@/utils/util';
import { css } from '@emotion/react';

type MyPostArticleProps = {
  blockUserItem: blockUserListItemType;
};
const MyPostArticle = ({ blockUserItem }: MyPostArticleProps) => {
  const timeExpression =
    blockUserItem.INS_DATE !== null ? formatOnlyDate(blockUserItem.INS_DATE) : 0;
  const urlLang = useUrlLanguage();
  const user_id = getCookie('user_id');
  const user_idx = getCookie('user_idx');

  const boardTexts = communityBoardTexts[urlLang];
  const handleUnBlock = async () => {
    let response = await deleteBlockUser(user_id, user_idx, Number(blockUserItem.IDX));
    response.status === 200 && ToastModal.alert(boardTexts.blockUser.unBlocked);
  };
  return (
    <li
      css={css`
        display: flex;
        justify-content: space-between;
        height: 88px;
        padding: 26px 16px 22px;
        border-bottom: 1px solid ${colors.gray[200]};
      `}
    >
      <div>
        <h4
          css={{
            wordBreak: 'break-word',
            fontWeight: '400',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {blockUserItem.NICK}
        </h4>
        <div css={{ color: '#999999', fontSize: '12px', marginTop: '6px' }}>{timeExpression}</div>
      </div>
      <UnstyledButton
        css={css`
          height: 28px;
          padding: 6px 8px;
          font-weight: 700;
          font-size: 14px;
          color: ${colors.gray[1000]};
          border-radius: 18px;
          border: 1px solid ${colors.gray[200]};
          margin-top: 13px;
        `}
        onClick={handleUnBlock}
      >
        {boardTexts.blockUser.unBlock}
      </UnstyledButton>
    </li>
  );
};

export default MyPostArticle;
