import React, { Component } from 'react';
import SearchBooksBar from './SearchBooksBar';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class SearchPage extends Component {
	state = {
		books: [],
		booksWithShelf: []
	} 

	componentDidMount() {
		BooksAPI.getAll()
		.then(books => {
			this.setState({
				booksWithShelf: books
			})

		})
	}

	searchBooks = (query) => {
		if (query === '') {
			this.setState({
				books: []
			})
			return
		}
		BooksAPI.search(query)
			.then(books => {
				books = books.length > 0 ? books : [];
				this.setState({
					books
				})
			})

	} 

	changeBookShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
	}
	
    render() {
		const { books, booksWithShelf } = this.state;
        return (
            <div className="search-books">
				<SearchBooksBar 
					searchBooks={this.searchBooks}
				/>
				<div className="search-books-results">
					<ol className="books-grid">
					{(books.length > 0) && books.map(book => {
						const bookHasShelf = booksWithShelf.find(b => b.id === book.id)
						if (bookHasShelf) {
							book.shelf = bookHasShelf.shelf
						}
						return (<Book 
							book={book}
							changeBookShelf={this.changeBookShelf}
							key={book.id}
						/>)
					}

					)}
					</ol>
				</div>
          </div>
        )
    }
}

export default SearchPage;