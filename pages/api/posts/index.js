import db from '../../../libs/db';
import authorizationToken from '../../../middleware/authorizationToken';

export default async function(req, res){
  if(req.method !== 'GET') return res.status(405).end();

  const authUser = await authorizationToken(req, res);

  const posts = await db('posts');

  res.status(200).json({
    message: 'Posts data',
    data: posts
  })
}