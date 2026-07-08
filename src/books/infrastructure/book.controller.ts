// Adaptador (rutas HTTP)
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateBookService } from '../application/create-book.service';
import { FindAllBooksService } from '../application/find-all-books.service'; // Importa el nuevo servicio
import { FindBookByIdService } from '../application/find-book-by-id.service';
import { UpdateBookService } from '../application/update-book.service'; // Importa el servicio de actualización
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books') // ruta base '/books'
export class BookController {
  constructor(
    private readonly createBookService: CreateBookService,
    private readonly updateBookService: UpdateBookService,
    private readonly findAllBooksService: FindAllBooksService,
    private readonly findBookByIdService: FindBookByIdService,
  ) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.createBookService.execute(createBookDto);
    return {
      message: 'Added book successfully',
      data: book,
    };
  }

  // ':id' -> parámetro dinámico en URL
  // ParseUUIDPipe -> valida que 'id' sea un UUID válido
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const book = await this.findBookByIdService.execute(id);
    return {
      message: 'Found book successfully',
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

  @Patch(':id')
  async updateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const updatedBook = await this.updateBookService.execute(id, updateBookDto);
    return {
      message: 'Updated book successfully',
      data: updatedBook,
    };
  }
}
