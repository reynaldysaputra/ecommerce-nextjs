import db from '../../../../libs/db';
import authorizationToken from '../../../../middleware/authorizationToken';

export default async function handler(req, res){
  if(req.method !== 'PUT') return res.status(405).end();

  const { id } = req.query;
  const {title, content} = JSON.parse(JSON.stringify(req.body));

  const auth = await authorizationToken(req, res);

  const update = await db('posts').where({ id }).update({
    title,
    content
  })

  const postData = await db('posts').where({id}).first();

  res.status(200).json({
    message: 'Post update succsesfully',
    data: postData
  })
}