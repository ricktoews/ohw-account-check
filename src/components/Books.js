import React, { Component } from 'react';
import '../css/style.css';

class BookRow extends Component {
  constructor(props) {
    super(props);
    this.book = props.book;
    this.book.is_te = this.book.is_te === 't';
    this.book.is_collection = this.book.is_collection === 't';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    let el = e.currentTarget;
    let collectionRow = el.querySelector('.collection-row');
    if (collectionRow.classList.contains('hide')) {
      collectionRow.classList.remove('hide');
    } else {
      collectionRow.classList.add('hide');
    }
  }

  render() {
    let book_id = this.book.book_id;
    let title = this.book.book_name;
    let schools = this.book.schools;
    let te = this.book.is_te ? 'Yes' : 'No';
    let collection = this.book.is_collection ? 'Yes' : 'No';
    let product_line = this.book.product_line;
    
    let collectionRows = '';
    let bookClass = 'single-book';
    if (this.book.is_collection) {
      bookClass = 'collection';
      let collectionBooks = this.book.collection.sort((a, b) => a.book_id - b.book_id);
      collectionRows = (<tr className="collection-row hide">
        <td colSpan="6">
          <h4>Books within this collection</h4>
          <table>
            <tbody>
            {collectionBooks.map(b => (<tr key={b.book_id} className="books-in-collection">
              <td>{b.book_id}</td>
              <td>{b.book_name}</td>
              <td>{b.product_line}</td>
            </tr>))}
            </tbody>
          </table>
        </td>
      </tr>)
    }

    let tbody = (<tbody className={bookClass} onClick={this.handleClick}>
      <tr className="book">
        <td>{book_id}</td>
        <td>{title}</td>
        <td>{schools}</td>
        <td>{te}</td>
        <td>{collection}</td>
        <td>{product_line}</td>
      </tr>
      {collectionRows}
    </tbody>);

    return tbody;

  }
}

function makeBookList(books, schoolLicensedBooks, licenses) {
  if (schoolLicensedBooks.length > 0) {
    schoolLicensedBooks.forEach({
      
    });
  } else {
  }
}

class Books extends Component {
  constructor(props) {
    super(props);
    this.schoolLicensedBooks = props.schoolLicensed;
    this.books = props.books || [];
    this.licenses = props.licenses;
    let schools_by_book = [];
    let school_ids = Object.keys(this.licenses);
    school_ids.forEach(school_id => {
      if (school_id > 0) {
        this.licenses[school_id].forEach(license => {
          let book_id = license.product_id;
          if (!schools_by_book[book_id]) { schools_by_book[book_id] = []; }
          schools_by_book[book_id].push(school_id);
        });
      }
    });
    this.schools_by_book = schools_by_book;
  }

  render() {
    return (<div>
      <h2>Books User Has Access To</h2>
      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Schools</th>
            <th>Teacher Ed.</th>
            <th>Collection</th>
            <th>Product Line</th>
          </tr>
        </thead>
          {this.books.map(b => {
            if (this.schoolLicensedBooks.length > 0) {
              let schoolRecord = this.schoolLicensedBooks.filter(sb => sb.book_id === b)[0];
              if (schoolRecord && schoolRecord.book_id) {
                schoolRecord.schools = this.schools_by_book[schoolRecord.book_id].join(', ');
              } else {
                schoolRecord = {schools: 'None'};
              }
              return <BookRow key={b} book={schoolRecord}/>
            } else {
              let schoolRecord = { book_id: b, schools: this.schools_by_book[b] };
              return <BookRow key={b} book={schoolRecord}/>
            }
          })}
      </table>
    </div>)
  }
}

export default Books;
