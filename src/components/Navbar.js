import react from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const Logout = async () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className='navbar'>
            <div className="nav-items">
                <Link to='/homepage'>Home</Link>                             
                <Link to='/bookregistration'>Register Book</Link>             
                <div className="txt-navbar">
                    <span className='txt-navbar'>{localStorage.getItem("userEmail")}</span>
                    <br></br>
                    <button className='change-status-btn' onClick={() => Logout()}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar