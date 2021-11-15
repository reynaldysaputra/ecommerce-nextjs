import {useState} from 'react';

export default function Register(){
  const [fields, setFields] = useState({email: '', password: ''});

  const handleChange = (e) => {
    setFields(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit =  async (e)  => {
    e.preventDefault();

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const registerRes= await registerReq.json();

    console.log(registerRes);
  }

  return(
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit.bind(this)}>
        <input type='text' placeholder='Email' name='email' onChange={handleChange.bind(this)}/><br/>
        <input type='password' placeholder='Password' name='password' onChange={handleChange.bind(this)}/><br/><br/>

        <button type='submit'>Register</button>
      </form>
    </>
  )
}