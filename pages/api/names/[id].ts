import type { NextApiRequest, NextApiResponse } from 'next'


type User = {
  name: string,
  type: "name" | "channel",
  active: boolean
}

type Data = {
    data: User[]
}

const data = [
  {
    type: "name",
    name: "Stephen",
    active: false
  },
  {
    type: "channel",
    name: "Jeff",
    active: true
  },
  {
    type: "name",
    name: "Larry",
    active: false
  },
  {
    type: "channel",
    name: "Gabe",
    active: true
  },
  {
    type: "name",
    name: "James",
    active: false
  },
  {
    type: "channel",
    name: "Zach",
    active: true
  },
  {
    type: "name",
    name: "Clint",
    active: false
  },
  {
    type: "channel",
    name: "Joe",
    active: true
  }
] as User[];

export default function userHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id }
  } = req;
  console.log(id);
  res.status(200).json({ data });
  return
}