import { VoteResponse } from '@/types/vote';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const page = 0;
  const per_page = Number(req.query.per_page) || 20;
  const vote_type = req.query.vote_type;

  const result = axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/votes/votes?vote_type=${vote_type}&page=${
      page - 1
    }&per_page=${per_page}`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImY5NjVjZDg3N2MyMTNkZjYwZWU2NDViMjYxZWJhYjcxMWRkYjIxZTE3OGExOTdjMmQ5NzY1ZTNkYTUyNDI2MDU1Y2QzYWFmMGE5ZTQxODljIiwiaWF0IjoxNjg4MDI0NTEzLjMzMzY4OCwibmJmIjoxNjg4MDI0NTEzLjMzMzY5MSwiZXhwIjoxNzE5NjQ2OTEzLjMxNTE3LCJzdWIiOiIxNzUiLCJzY29wZXMiOltdfQ.bKebFWEEu2ruQS0aj0wbjU3MWldP7lcJdesoiLxVZcf1cMFiOCGjKW2SNmCDCGUMckVu-SWZTpIRs-7YBsa6Ag3BjYMdxjlpzd7iyx3wBnkV4nJDSV46o9DFwGP2_4T9wyiVms1X3kgmW6W0o_domAtFAk5l_ny4s5cdO5faZOSj7weSdgSmLz69PxwrsJZgM-Z24flOB40TiIMgcvA_nzA7sIBe8P_PljpEUZYYXMlcn4V1yGoj_eyJOsFvV88Ep8HRF3hya6DPAs2Q1cwQcaTkchShzO3xYgkqtGhQ6NxBB7nmjpBMQyUhf1HYfLFDH7eWCwWJkUNc8YduvzatvP7wDWWc_h4dpMutMjtwQbjJLFj5bsl5VSpVkW8ev3_ASS97NxNtY6OcUxTrsm0oFCiScy_yDMqXWR3Ym3KJz_Sj4yWujtQ-2Yo4AKih2IlteGX0rTInNQtuk0eKaGF_jQaeIbEx9OWoWM9Akquy1EULcO3Vtzjzqf54fj5H3MkjdkrH5prRh_cBJvB_viNnCLswy3aKnf5QEFRr7I2--8SEw5Y21bHf6B10ol7AvegoYFMS3o3Cy9SrP6YpvAmRzLYnco-8TaRw0a1QgyGGywSxiL2wiVQXbCoK95qwK9FhBProc5xJd0NYgb_7NYDQJ4Ii3ZX3u7TMYZSi56vlkMM`,
      },
    }
  );
  res.status(200).json(result);
}
