import db from '../../../../libs/db';

export default async function handler(req, res){
  let message = 'Post deleted susccsesfully';
  let status = 200;
  
  if(req.method !== 'DELETE') return res.status(405).end();

  const {id} = req.query;
  const deleteRow = await db('posts').where({id}).del();

  if(deleteRow === 0) {
    status = 405;
    message = 'No data requested!';
  }

  res.status(status).json({message})
}