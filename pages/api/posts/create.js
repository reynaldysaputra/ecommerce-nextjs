import db from '../../../libs/db';
import authorizationToken from '../../../middleware/authorizationToken';

export default async function handler(req, res){
  if(req.method !== 'POST') res.status(405).end();

  const auth = await authorizationToken(req, res);
  
  try {
    const {title, content} = JSON.parse(JSON.stringify(req.body));
    const create = await db('posts').insert({title, content});
    const createdData= await db('posts').where('id', create).first();

    return res.status(200).json({ 
      message: 'Post created succsesfully' ,
      data: createdData
    });
  }catch(err) {
    return res.status(401).json({ message: err })
  }
}