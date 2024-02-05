import { UnstyledButton } from '@/components/atoms';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { formatWrittenTimeLite } from '@/utils/util';
import { css } from '@emotion/react';

type MyPostArticleProps = {
  blockUserItem: any;
};
const MyPostArticle = ({ blockUserItem }: MyPostArticleProps) => {
  // const timeExpression =
  //   blockUserItem.PUBLISH_DATE !== null ? formatWrittenTimeLite(blockUserItem.PUBLISH_DATE) : 0;
  const timeExpression = '2024.01.01';
  const urlLang = useUrlLanguage();
  const boardTexts = communityBoardTexts[urlLang];
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
          {blockUserItem.USER}
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
      >
        차단해제
      </UnstyledButton>
    </li>
  );
};

export default MyPostArticle;
