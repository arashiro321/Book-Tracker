import * as React from 'react'
import { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import '../../styles.css'
import api from '../../Api.js'

const HomePage = () => {
  
  Modal.setAppElement('#root')

  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState(-1);
  const [bookStatus, setBookStatus] = useState([]);
  const [newBookStatus, setnewBookStatus] = useState(1);
  const [bookNotes, setBookNote] = useState(0);
  const [modalStatusIsOpen, setStatusIsOpen] = useState(false)
  const [modalNoteIsOpen, setNoteIsOpen] = useState(false)

  useEffect(() => {
    console.log(books.length)
    listBooks()
  }, [])

  const listBooks = useCallback(async () => {
    const bookRes = await api.get('/listbooks', {
      params: 
      {
        userId: await localStorage.getItem("userId")
      }
    });
    setBooks(bookRes.data.books)
  })

  const openChangeBookStatusModal = async (bookId) => {
    const bookRes = await api.get('/bookstatus');
    setBookId(bookId)
    setBookStatus(bookRes.data.booksStatus)
    setStatusIsOpen(true)
  }

  const openChangeBookNoteModal = async (bookId) => {
    setBookId(bookId)
    setNoteIsOpen(true)
  }

  const deleteBook = async (bookId) =>{
    const bookRes = await api.delete('/deletebook', {
      data:{bookId: bookId}
    })
    window.alert("Book deleted successfully")
    window.location.reload();
  }

  const closeStatusModal = () => {
    setStatusIsOpen(false)
  }

  const closeNoteModal = () => {
    setNoteIsOpen(false)
    setBookNote(0)
  }

  const changeBookStatus = async () => {
    const bookRes = await api.put('/bookupdatestatus', {
      data:{
        bookId: bookId, 
        bookStatusId: newBookStatus
      }
    })
  }

  const changeNoteStatus = async () => {
    const bookRes = await api.put('/bookupdatenote', {
      data:{
        bookId: bookId, 
        bookNote: bookNotes
      }
    })
    if(bookRes.data.status === 500)
      window.alert(bookRes.data.error)
    else
      window.location.reload();
  }

  const customModalStyle = {
    content:{
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <div className='container'>
      <div className='container-component'>
        <div className='wrap-table-component'>
          <span className="component-form-title">List of your books!</span>
          <table className='wrap-table'>
            <thead>
              <th><span className="txt4">Book's Title</span></th>
              <th><span className="txt4">Book's Author</span></th>
              <th><span className="txt4">Date added to list</span></th>
              <th><span className="txt4">Due Date</span></th>
              <th><span className="txt4">Note</span></th>
              <th><span className="txt4">Status</span></th>
              <th></th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              { books ? books.map((item, index) => {
                  return(
                    <tr key={index}>
                      <td><span className="txt4">{item.TITLE}</span></td>
                      <td><span className="txt4">{item.AUTHOR}</span></td>
                      <td><span className="txt4">{item.DATE_ADDED_TO_LIST}</span></td>
                      <td><span className="txt4">{item.DUE_DATE}</span></td>
                      <td><span className="txt4">{item.NOTE}</span></td>
                      <td><span className="txt4">{item.STATUS_ID === 1 ? "Want to Read" : item.STATUS_ID === 2 ? "Reading" : "Read" }</span></td>
                      <td><button className='change-status-btn' onClick={() => openChangeBookStatusModal(item.BOOK_ID)}>Change Status</button></td>
                      <td><button className='change-status-btn' onClick={() => openChangeBookNoteModal(item.BOOK_ID)}>Add Note</button></td>
                      <td><button className='delete-btn' onClick={() => deleteBook(item.BOOK_ID)}>Delete</button></td>
                    </tr>
                  )                                  
                })
                :
               null
              } 
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={modalStatusIsOpen} onRequestClose={closeStatusModal} style={customModalStyle}>
        <div className='wrap-component'>
          <form className='component-form' onSubmit={changeBookStatus}>
            <div className="wrap-input">
              <label>
              <span className="txt4">Choose the current status</span>
                <select className='input' value={newBookStatus} onChange={e => setnewBookStatus(e.target.value)}>
                  { bookStatus.map((status, index) => {
                    return(
                      <option className='txt1' value={status.STATUS_ID}>{status.STATUS_NAME}</option>
                    )
                  })
                  }
                </select>
              </label>
            </div>  
            <div className="container-component-form-btn">
              <button type="submit"className="component-form-btn">Update</button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={modalNoteIsOpen} onRequestClose={closeNoteModal} style={customModalStyle}>
        <div className='wrap-component'>
          <div className="wrap-input">
            <div className="wrap-input">
              <input 
                className={bookNotes !== "" ? "has-val input " : "input "} 
                type="number" 
                value={bookNotes}
                onChange={e => setBookNote(e.target.value)}                  
              />
              <span className="focus-input" data-placeholder="Note"></span>
            </div>  
          </div>  
          <div className="container-component-form-btn">
            <button type="submit"className="component-form-btn" onClick={changeNoteStatus}>Update</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
