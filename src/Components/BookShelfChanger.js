import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
    static propTypes = {
        bookShelf: PropTypes.string.isRequired,
        changeBookShelf: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired  
    }

    state = {
        value: ''
    }

    componentDidMount() {
        this.setState({
            value: this.props.bookShelf || 'none'
        })
    }

    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            value
        })

        this.props.changeBookShelf(this.props.book, value)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value } onChange={this.handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}



export default BookShelfChanger;