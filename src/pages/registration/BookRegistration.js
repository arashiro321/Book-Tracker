import { useState } from 'react';
import '../../styles.css'
import { Link, useNavigate   } from 'react-router-dom'
import api from '../../Api.js'
import axios from 'axios'

const BookRegistration = () => {
  const [userId, setBookUserId] = useState("")
  const [title, setBookTitle] = useState("")
  const [author, setBookAuthor] = useState("")
  const [dueDate, setBookDueDate] = useState("")
  const [status, setBookStatus] = useState("")
  const [note, setBookNote] = useState("")

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault()
    setBookUserId(localStorage.getItem("userId"))
    const res = await api.post('/bookregistration', {
        data: {
            bookAddedByUserId: localStorage.getItem("userId"),
            bookTitle: title, 
            bookAuthor: author,
            bookDueDate: dueDate,
            bookStatusId: status,
            bookNote: note
        }
    })
    if(res.data.status !== 201){
    window.alert(res.data.error)
    }else{
    // navigate("/homepage")
    }
}

  return (
    <div className='container'>
      <div className='container-component'>
        <div className='wrap-component'>
          <form className='component-form' onSubmit={register}>

            <span className="component-form-title">Register</span>
            <br/>
            <span className="component-form-sub-title">Fill in the fields below to register the book</span>
            <br /><br />
            <div className="wrap-input">
              <input 
                className={title !== "" ? "has-val input" : "input"} 
                type="text" 
                value={title}
                onChange={e => setBookTitle(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Title"></span>
            </div>

            <div className="wrap-input">
              <input 
                className={author !== "" ? "has-val input" : "input"} 
                type="text" 
                value={author}
                onChange={e => setBookAuthor(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Author"></span>
            </div>

            <div className="wrap-input">
              <input 
                className={dueDate !== "" ? "has-val input" : "input"} 
                type="date" 
                value={dueDate}
                onChange={e => setBookDueDate(e.target.value)}
              />          
              <span className="focus-input" data-placeholder="Due Date"></span>
            </div>

            <div className="wrap-input">
              <input 
                className={status !== "" ? "has-val input" : "input"} 
                type="number" 
                value={status}
                onChange={e => setBookStatus(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Status: 1- Want to Read 2- Reading 3- Read"></span>
            </div>

            <div className="wrap-input">
              <input 
                className={note !== "" ? "has-val input " : "input "} 
                type="number" 
                value={note}
                onChange={e => setBookNote(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Note"></span>
            </div>            
            <div className="container-component-form-btn">
              <button type="submit"className="component-form-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookRegistration;
