import db from '../../../../libs/db';
import authorizationToken from '../../../../middleware/authorizationToken';

export default async function handler(req, res){
  await authorizationToken(req, res);

  if(req.method !== 'GET') return res.status(401).end();

  const {id} = req.query;

  const post = await db('posts').where({id}).first();

  if(post !== undefined) {
    return res.status(200).json({
      message: 'Posts data',
      data: post
    })
  }else {
    return res.status(401).end();
  }
}