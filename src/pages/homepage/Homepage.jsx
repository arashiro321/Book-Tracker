import { useEffect } from 'react';
import '../../styles.css'
import api from '../../Api.js'

const HomePage = () => {
  useEffect(() => {
    list()
  })

  let tr = []

  const list = async () => {
    const b = await api.get('/listbooks');
    
    for(let i = 0; i < b.data.books.length; i++){
      tr.push(
        <tr>
        <td key={b.BOOK_ID}><span className="txt4">{b.data.books[i].TITLE}</span></td>
        <td key={b.AUTHOR}><span className="txt4">{b.data.books[i].AUTHOR}</span></td>
        <td key={b.DATE_ADDED_TO_LIST}><span className="txt4">{b.data.books[i].DATE_ADDED_TO_LIST}</span></td>
        <td key={b.DUE_DATE}><span className="txt4">{b.data.books[i].DUE_DATE}</span></td>
        <td key={b.NOTE}><span className="txt4">{b.data.books[i].NOTE}</span></td>
        <td key={b.STATUS_ID}><span className="txt4">{b.data.books[i].STATUS_ID}</span></td>
      </tr>
      )
    }
    console.log(tr)
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
            </thead>
            <tbody>
              <tr>
              {
                tr.map((b, i) => {
                  <td key={i}><span className="txt4">{b}</span></td>
                  // <td key={b.DATE_ADDED_TO_LIST}><span className="txt4">{b.data.books.DATE_ADDED_TO_LIST}</span></td>,
                  // <td key={b.DUE_DATE}><span className="txt4">{b.data.books.DUE_DATE}</span></td>,
                  // <td key={b.NOTE}><span className="txt4">{b.data.books.NOTE}</span></td>,
                  // <td key={b.STATUS_ID}><span className="txt4">{b.data.books.STATUS_ID}</span></td>
                })
              }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
