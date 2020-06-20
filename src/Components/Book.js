import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger';

const Book = (props) => {
    const {
        changeBookShelf,
        book,
        book:  {
            title,
            authors, 
            shelf, 
            imageLinks
        }
    } = props;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks && imageLinks.thumbnail})` }}></div>
                    <BookShelfChanger
                        bookShelf={shelf || 'none'}
                        changeBookShelf={changeBookShelf}
                        book={book}
                    />
                </div>
                <div className="book-title">{title}</div>
                <ul className="book-authors">
                    {authors && authors.map((author, index) => 
                        <li key={index}>{author}</li>
                    )}
                </ul>
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}
export default Book;