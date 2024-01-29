import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto, FilterBookDto } from './dto/book.dto';

export type Book = {
    id: string,
    title: string,
    author: string,
    category: string,
    year: number,
}

@Injectable()
export class BooksService {
    private books: Book[] = [
        { id: uuidv4(), title: 'Book A', author: 'Author A', category: 'Category A', year: 2015 }
    ];

    getBook(id: string): Book {
        const selectedBook = this.books.find((book: Book) => book.id === id)

        return selectedBook
    }

    getAllBooks(query?: FilterBookDto): Book[] {
        // if there are any query, then execute below query logic method
        if (query && Object.keys(query).length > 0) {
            return this.books.filter((book: Book) => {
                let check = false;

                Object.entries(query).map(([queryKey, queryValue]) => {
                    if ((queryKey === 'min_year' || queryKey === 'max_year')) {
                        if (queryKey === 'min_year') {
                            const val: number = Number(queryValue)
                            return check = book.year >= val
                        }
                        if (queryKey === 'max_year') {
                            const val: number = Number(queryValue)
                            return check = book.year <= val
                        }
                    }

                    check = book[queryKey].toString().toLowerCase().includes(queryValue.toString().toLowerCase())

                    return check
                })

                return check;
            })
        }

        // if there are no query, then just return all the value of books array
        return this.books;
    }

    createBook({ title, author, category, year }: CreateBookDto): Book[] {
        this.books.push({
            id: uuidv4(),
            title,
            author,
            category,
            year,
        })
        return this.getAllBooks();
    }

    updateBook(id: string, title: string, author: string, category: string, year: number): Book[] {
        const selectedBook = this.books.findIndex((book: Book) => book.id === id)
        if (selectedBook < 0) {
            throw new NotFoundException(`Book with id ${id} is not found!`);
        }

        this.books[selectedBook].title = title
        this.books[selectedBook].author = author
        this.books[selectedBook].category = category
        this.books[selectedBook].year = year

        return this.getAllBooks();
    }

    deleteBook(id: string): Book[] {
        const selectedBook = this.books.findIndex((book: Book) => book.id === id)
        this.books.splice(selectedBook, 1)

        return this.getAllBooks();
    }
}
