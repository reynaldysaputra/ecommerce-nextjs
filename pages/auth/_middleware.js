import { NextResponse, NextRequest } from 'next/server'

export function middleware(req) {
  const allTokens = req.headers.get('cookie').split(' ');
  let token = false;
  
  allTokens.map(item =>{
    if(item.includes('token')) token = true;
  });

  if(token){
    return NextResponse.redirect('/posts');
  }

    // return NextResponse.redirect('/posts')

    // if(allCookies.token){
    //   return NextResponse.redirect('/posts');
    // }
    return NextResponse.next();
}