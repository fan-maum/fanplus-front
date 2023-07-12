import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const request = new Request(
      'https://fanplus.co.kr/wp-admin/admin-ajax.php?action=brizy_submit_form',
      {
        method: 'POST',
        body: req.body,
      }
    );
    fetch(request).then((result) => {
      if (result.status === 200) res.status(200).json('Done');
      else res.status(400).json('error');
    });
  }
}
