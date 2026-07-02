// Adaptador (rutas HTTP)
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBookService } from '../application/create-book.service';
import { FindAllBooksService } from '../application/find-all-books.service'; // Importa el nuevo servicio
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('books') // ruta base '/books'
export class BookController {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly findAllBooksService: FindAllBooksService,
  ) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.createBookService.execute(createBookDto);
    return {
      message: 'Added book successfully',
      data: book,
    };
  }

  @Get()
  async findAllBooks(@Query() paginationDto: PaginationDto) {
    const result = await this.findAllBooksService.execute(paginationDto);
    return {
      message: 'Found all books successfully',
      data: result.data,
      meta: result.meta,
    };
  }
}
