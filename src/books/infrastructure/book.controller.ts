// Adaptador (rutas HTTP)
// src/books/infrastructure/book.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookService } from '../application/create-book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books') // ruta base '/books'
export class BookController {
  constructor(private readonly createBookService: CreateBookService) {}

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto) {
    const book = await this.createBookService.execute(createBookDto);
    return {
      message: 'Libro registrado exitosamente',
      data: book,
    };
  }
}
