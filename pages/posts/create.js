import Cookies from 'js-cookie';
import {useState} from 'react';
import Router from 'next/router';
import Nav from '../../components/nav';

export default function Create(){
  const token = Cookies.get('token');
  const [status, setStatus] = useState('normal');
  const [field, setField] = useState({title: '', content: ''});

  const createHandler = async (e) => {
    e.preventDefault();
    
    setStatus('Loading..');

    const create = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(field)
    })

    if(!create.ok) return setStatus('error');

    const res = await create.json();

    setStatus(res.message);

    Router.push('/posts');
  }

  const fieldHandler = async (e) => {
    setField({
      ...field,
      [e.target.name]: e.target.value
    })
  }

  return(
    <>
      <Nav/>
      <h2>Create posts</h2>
      <form onSubmit={createHandler.bind(this)}>
        <input
            onChange={fieldHandler.bind(this)}
            type="text" 
            placeholder="Title" 
            name="title" 
        />
        <br />
        <textarea
            onChange={fieldHandler.bind(this)}
            placeholder="Content" 
            name="content" 
        ></textarea>
        <br />
        
        <button type="submit">
            Create Post
        </button>

        <div>
            Status: {status}
        </div>
        </form>
    </>
  )
}