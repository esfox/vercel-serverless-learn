import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DB } from '../db';

export default async (request: VercelRequest, response: VercelResponse) =>
{
  switch(request.method)
  {
    case 'POST':
      post(request, response);
      break;

    case 'GET':
    default:
      get(request, response);
      break;
  }
};

async function get(request: VercelRequest, response: VercelResponse)
{
  try
  {
    const data = await DB.things();
    response.status(200).send(data);
  }
  catch(error)
  {
    console.log(error);
    response.status(500).send('');
  }
}

async function post(request: VercelRequest, response: VercelResponse)
{
  const [data] = await DB.things()
    .insert(request.body)
    .returning('*');

  response.status(200).send(data);
}
