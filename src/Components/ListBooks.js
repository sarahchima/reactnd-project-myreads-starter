import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class ListBooks extends Component {
    bookShelfs = [
        {
            'title': 'Currently Reading',
            'value': 'currentlyReading'
        },
        {
            'title': 'Want To Read',
            'value': 'wantToRead'
        },
        {
            'title': 'Read',
            'value': 'read'
        }
    ]
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
    }

    componentDidMount() {
        BooksAPI.getAll() 
            .then(books => {
                const currentlyReading = this.filterBooks(books, 'currentlyReading');
                const wantToRead = this.filterBooks(books, 'wantToRead');
                const read = this.filterBooks(books, 'read');

                this.setState({
                    books,
                    currentlyReading,
                    wantToRead,
                    read
                })
            })
    }

    filterBooks = (books, shelf) => {
        const shelfBooks = books.filter((book) => book.shelf === shelf)
        return shelfBooks;
    }

    changeBookShelf = (book, newShelf) => {
        const prevShelf = book.shelf;
        this.setState((currentState) => ({
            [prevShelf]: currentState[prevShelf].filter(b => b.id !== book.id),
            [newShelf]: currentState[newShelf].concat([book])
        }));
        BooksAPI.update(book, newShelf)
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <ol>
                    {this.bookShelfs.map((bookShelf) => 
                        <BookShelf 
                            key={bookShelf.value}
                            title={bookShelf.title}
                            books={this.state[bookShelf.value]}
                            changeBookShelf={this.changeBookShelf}
                        />
                    )}
                </ol>
                <div className="open-search">
                    <Link 
                        to="/search"
                        className="add-contact"
                    >Add a book</Link>
                </div>
            </div>
        )
    }

}

export default ListBooks;