import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
    const { changeBookShelf, books, title } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => 
                        <Book
                            changeBookShelf={changeBookShelf}
                            book={book}
                            key={book.id}
                        />
                    )}
                </ol>
            </div>
        </div>
    )
}
BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired   
}

export default BookShelf; 