import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DB } from '../db';

//
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
  const data = await DB.properties();
  response.status(200).send(data);
}

async function post(request: VercelRequest, response: VercelResponse)
{
  const [data] = await DB.properties()
    .insert(request.body)
    .returning('*');

  response.status(200).send(data);
}
