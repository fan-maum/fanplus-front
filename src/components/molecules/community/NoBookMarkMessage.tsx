import IconBookmark from '@/components/atoms/IconBookmark';
import { colors } from '@/styles/CommunityColors';
import { bookmarkTexts } from '@/texts/bookmarkTexts';
import { UrlLangType } from '@/types/common';
import styled from '@emotion/styled';

const NoBookmarkMessage = ({ urlLang }: { urlLang: UrlLangType }) => {
  const texts = bookmarkTexts[urlLang];
  return (
    <NoBookmarkMessageWrapper>
      <div
        dangerouslySetInnerHTML={{ __html: texts.NoBookmarkMessage }}
        css={{
          height: '100%',
          img: {
            width: '16px',
            height: '16px',
            margin: '0 2px 3px 0',
            verticalAlign: 'middle',
          },
        }}
      ></div>
    </NoBookmarkMessageWrapper>
  );
};

export default NoBookmarkMessage;

const NoBookmarkMessageWrapper: any = styled.div`
  height: 80px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 12px;
  color: ${colors.gray[1000]};
  background-color: ${colors.gray[20]};
  text-align: center;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
