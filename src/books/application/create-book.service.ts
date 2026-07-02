// caso de uso para crear un libro
import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto'; // Utilidad nativa de Node.js para generar UUIDs
import { Book } from '../domain/book.entity';
import type { IBookRepository } from '../domain/book.repository';
import { CreateBookDto } from '../infrastructure/dto/create-book.dto';

@Injectable()
export class CreateBookService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(dto: CreateBookDto): Promise<Book> {
    // Instanciar entidad dominio
    const newBook = new Book(
      crypto.randomUUID(), // Generar id único
      dto.externalId,
      dto.title,
      dto.author,
      dto.coverUrl,
      dto.isbn,
      dto.totalPages,
    );
    await this.bookRepository.save(newBook); // Guardar en db
    return newBook; // return libro nuevo
  }
}
