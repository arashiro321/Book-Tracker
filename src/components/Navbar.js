import react from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    // const navigate = useNavigate()
    // const Logout = async (e) => {
    //     e.preventDefault()
    //     localStorage.clear()
    //     navigate("/")
    // }
    return (
        <div className='navbar'>
            <div className="nav-items">
                <Link to='/homepage'>Home</Link>                             
                <Link to='/bookregistration'>Register Book</Link>             
                <Link to='/removeBook'>Remove Book</Link>
                {/* <a onClick={Logout()}>Logout</a> */}
            </div>
        </div>
    )
}

export default Navbar