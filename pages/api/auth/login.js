import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();

  const {email, password} = JSON.parse(JSON.stringify(req.body));
  const checkUser = await db('users').where({ email }).first();
  const checkPassword = await bcrypt.compare(password, checkUser.password);

  if(!checkUser || !checkPassword) return res.status(401).end();

  const tokenJwt = jwt.sign({
    id: checkUser.id,
    email: checkUser.email
  }, 'jwtBcrypt', {
    expiresIn: '7d'
  })

  res.status(200).json({
    message: "Login succsessfully",
    token: tokenJwt
  })
}