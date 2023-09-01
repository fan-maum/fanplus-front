import { getCommunityBoardData } from '@/api/Community';
import { CommunityBoardPropType } from '@/components/templates/CommunityBoardTemplate';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { CommunityBoardResponseType } from '@/types/community';
import { LangCookie } from '@/utils/setLangCookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

const board = ({ communityBoardData }: CommunityBoardPropType) => {
  const router = useRouter();
  const boardIndex = router.query.boardIndex;
  // console.log(communityBoardData);
  return (
    <div>
      {/** 각 게시판. query 값으로 이동하도록 하면 될려나? */}
      {boardIndex}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityBoardData: CommunityBoardResponseType | null;
}> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = translateFrontLangToBackLang(context.req.url?.split('/')[1] as LangCookie);
  const boardLang = translateFrontLangToBackLang(context.query.boardLang as LangCookie) || lang;
  const topic = parseInt(context.query.topic as string) || '';

  if (typeof boardIndex !== 'number') return { notFound: true };
  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    lang,
    boardLang,
    topic
  );
  return {
    props: { communityBoardData },
  };
};

export default board;
