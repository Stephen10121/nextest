import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    id: string
}

export default function userHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id },
    method,
  } = req
  res.status(200).json({ id: `User ${id}` });
  return
  console.log(id);
  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id: `User ${id}` })
      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id: `User ${id}` })
      break
    default:
      res.status(200).json({ id: `User ${id}` })
  }
}