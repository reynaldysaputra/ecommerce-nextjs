import Router from 'next/router';
import {useState} from 'react';
import Nav from '../../components/nav';

export default function Posts(props){
  const [posts, setPosts] = useState(props.posts.data);

  const handleDelete = async (e, id) => {
    const ask = confirm('Will this data be deleted?');

    if(ask) {
      setPosts(posts => posts.filter(post => post.id !== id));

      const deletePosts = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${props.token}`
        }
      })
  
      const res = await deletePosts.json();
  
      console.log(res);
    }
  }

  return(
    <>
    <Nav/>
      <h2>Posts</h2>
      <ul>
        {posts.map(posts => (
          <li key={posts.id}>
            {posts.title} - {posts.content} | &nbsp;
            <button onClick={() => Router.push(`/posts/${posts.id}`)}>Edit</button>
            <button onClick={(e) => handleDelete(e, posts.id)} >Delete</button>
          </li>
        ))}
      </ul>

      <button>Logout</button>
    </>
  )
}  

export async function getServerSideProps(ctx){
  const token = ctx.req.cookies['token']
  const postReq = await fetch('http://localhost:3000/api/posts', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const posts = await postReq.json();

  return {
    props: { 
      posts,
      token
    }
  }
}
