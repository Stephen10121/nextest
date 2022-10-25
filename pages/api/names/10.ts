import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    id: string
}

export default function userHandler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ id: `User 10` })
}