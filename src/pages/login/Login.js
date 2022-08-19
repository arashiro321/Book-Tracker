import { React, useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../../styles.css'
import api from '../../Api.js'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let userLogged = localStorage.getItem("userId");
    if(userLogged)
      navigate("/homepage")
  })

  const login = async (e) => {
    e.preventDefault()
    
    let res = api.get('/login', {
      params: {
        userEmail: email, 
        userPassword: password
      }
    });

    console.log((await res).data)

    if((await res).data.status !== 201){
      window.alert((await res).data.error)
    }else{
      localStorage.setItem("userId", (await res).data.userObj.USER_ID);
      localStorage.setItem("userEmail", (await res).data.userObj.EMAIL);
      navigate("/homepage")
    }
  }

  return (
    <div className='container'>
      <div className='container-component'>
        <div className='wrap-component'>
          <form className='component-form' onSubmit={login}>
            <span className="component-form-title">Welcome to Book Tracker!</span>
            <br /><br />
            <div className="wrap-input">
              <input 
                className={email !== "" ? "has-val input" : "input"} 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>
            <div className="wrap-input">
              <input 
                className={password !== "" ? "has-val input" : "input"} 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>
            <div className="container-component-form-btn">
              <button type='submit' className="component-form-btn">Login</button>
            </div>
            <div className="text-center">
              <span className="txt1">Don't have an account?</span>

              <Link to='/registration'><span className="txt2">Create an account.</span></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
