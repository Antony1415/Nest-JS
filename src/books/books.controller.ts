// note file name books.controller.ts was same like book.ts
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, FilterBookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
    // first method to declare constructor
    // private bookService: BooksService
    // constructor(bookService: BooksService) {
    //     this.bookService = bookService
    // }

    // second method to declare construcotr --> the shortcut of first method
    // we can use private readonly service: Service for guarding the variable so that it cannot be changed
    constructor(private bookService: BooksService) { }

    // third method declare constructor using @Inject
    // @Inject means importing another service. In Nest.js services need to define with decorator @Injectable
    // https://medium.com/@vahid.vdn/nestjs-providers-usevalue-useclass-usefactory-63a71f94da43
    // constructor(@Inject(BooksService) private bookService: BooksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getAllBooks(@Query() query: FilterBookDto) {
        // basic return getAll method  ---> (return this.books)
        // return this.bookService.getAllBooks()

        // Query method
        // Notes: query value is always return a string
        return this.bookService.getAllBooks(query);
    }

    @Get('/:id')
    // localhost:3000/books?min_year=123&title=A
    getBook(@Param('id') id: string) {
        // /books/xxx  ---> means the 'xxx' it can be called using @Param method e.g as 'id' variable
        // @Param('id')  ---> string 'id' it can be changed to another variable
        return this.bookService.getBook(id);
    }

    @Post()
    // route handler pipe / validation
    // @UsePipes(new ValidationPipe())
    @UsePipes(ValidationPipe)
    createBook(@Body() payload: CreateBookDto) {
        // example body raw json payload
        // {
        //     "title": "Book BA",
        //     "author": "Author BA",
        //     "category": "Category BA",
        //     "year": 2020
        // }
        return this.bookService.createBook(payload);
    }

    @Patch()
    // parameter scope pipe / validation
    updateBook(
        @Body('id') id: string,
        @Body('title') title: string,
        @Body('author') author: string,
        @Body('category') category: string,
        @Body('year', ParseIntPipe) year: number) {
        // example body raw json payload
        // {
        //     "id": "edf0545f-82b9-4f57-bee8-487acdf1551f",
        //     "title": "Book AAA",
        //     "author": "Author AAA",
        //     "category": "Category AAA",
        //     "year": "2000"
        // }
        return this.bookService.updateBook(id, title, author, category, year);
    }

    @Delete('')
    //localhost:3000/books?id=47b57bc6-4c31-4adf-a326-b926085d732b
    deleteBook(@Query('id') id: string) {
        return this.bookService.deleteBook(id);
    }
}
