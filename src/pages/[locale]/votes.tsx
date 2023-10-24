import { getVoteList } from '@/api/Vote';
import Layout from '@/components/organisms/Layout';
import VotesLayout from '@/components/templates/VoteLayout';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
export interface EventProps extends InferGetServerSidePropsType<typeof getServerSideProps> {}

const Votes = ({ urlLang, voteList }: EventProps) => {
  return (
    <Layout urlLang={urlLang}>
      <VotesLayout voteList={voteList} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const vote_type = (context.query.vote_type as string) || '';
  const page = Number(context.query.page) - 1 || 0;
  const per_page = Number(context.query.per_page) || 9;

  const voteList = await getVoteList(vote_type, page, per_page, serverLang);

  return {
    props: { urlLang, voteList },
  };
};

export default Votes;
