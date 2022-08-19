import { useState } from 'react';
import '../../styles.css'
import { Link, useNavigate   } from 'react-router-dom'
import api from '../../Api.js'
import axios from 'axios'

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault()
    if(password === confirmPassword){
      const res = await api.post('/registration', {
        data: {userEmail: email, userPassword: password}
      })
      if(res.data.status !== 201){
        window.alert(res.data.error)
      }else{
        navigate("/")
      }
    }
  }

  return (
    <div className='container'>
      <div className='container-component'>
        <div className='wrap-component'>
          <form className='component-form' onSubmit={register}>

            <span className="component-form-title">Register</span>
            <br/>
            <span className="component-form-sub-title">Fill in the fields below to proceed with your registration</span>
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

            <div className="wrap-input">
              <input 
                className={confirmPassword !== "" ? "has-val input" : "input"} 
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />          
              <span className="focus-input" data-placeholder="Confirm Password"></span>
            </div>
            
            {confirmPassword != password ? <span className="txt3">The passwords do not match!</span> : null}
            <br/>
            <div className="container-component-form-btn">
              <button type="submit"className="component-form-btn">Register</button>
            </div>
            <Link to='/'><span className="txt3">I already have a registration!</span></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
