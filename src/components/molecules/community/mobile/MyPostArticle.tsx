import { UnstyledButton } from '@/components/atoms';
import { useDeleteBlockUserOnClick } from '@/hooks/useDeleteBlockUserOnClick';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { blockUserListItemType } from '@/types/community';
import { getCookie } from '@/utils/Cookie';
import { formatOnlyDate } from '@/utils/util';
import { css } from '@emotion/react';
import { useQueryClient } from 'react-query';

type MyPostArticleProps = {
  blockUserItem: blockUserListItemType;
};

type UnblockUserProps = {
  user_id: string;
  user_idx: string;
  targetUserIdx: number;
};

const MyPostArticle = ({ blockUserItem }: MyPostArticleProps) => {
  const queryClient = useQueryClient();
  const timeExpression =
    blockUserItem.INS_DATE !== null ? formatOnlyDate(blockUserItem.INS_DATE) : 0;
  const urlLang = useUrlLanguage();
  const user_id = getCookie('user_id');
  const user_idx = getCookie('user_idx');

  const boardTexts = communityBoardTexts[urlLang];

  const { useUnblockUser } = useDeleteBlockUserOnClick();
  const handleUnBlock = (targetUserIdx: number) => {
    useUnblockUser.mutate({ user_id, user_idx, targetUserIdx });
    queryClient.invalidateQueries('blockUsers');
  };
  return (
    <li
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center; /* 차단된 날짜 추가 시 삭제예정 */
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
        {/* <div css={{ color: '#999999', fontSize: '12px', marginTop: '6px' }}>{timeExpression}</div> */}
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
        onClick={() => handleUnBlock(Number(blockUserItem.IDX))}
      >
        {boardTexts.blockUser.unBlock}
      </UnstyledButton>
    </li>
  );
};

export default MyPostArticle;
