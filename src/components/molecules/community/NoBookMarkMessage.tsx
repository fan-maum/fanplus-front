import IconBookmark from '@/components/atoms/IconBookmark';
import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';

const NoBookmarkMessage = () => {
  return (
    <NoBookmarkMessageWrapper>
      <div>
        게시판 제목의 <IconBookmark width="16" height="16" iconCss={{ margin: '0 3px 3px 0' }} />
        아이콘을
      </div>
      <div>선택하면</div>
      <div>즐겨찾기에 추가됩니다.</div>
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
  }
`;
