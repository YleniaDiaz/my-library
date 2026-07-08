// caso de uso para actualizar un libro
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../domain/book.entity';
import type { IBookRepository } from '../domain/book.repository';
import { UpdateBookDto } from '../infrastructure/dto/update-book.dto';

@Injectable()
export class UpdateBookService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string, dto: UpdateBookDto): Promise<Book> {
    if (!id) throw new NotFoundException(`Book id is required for update`);

    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundException(`Book with id: ${id} not found`);

    const updatedBook = new Book(
      book.id,
      dto.externalId ?? book.externalId,
      dto.title ?? book.title,
      dto.author ?? book.author,
      dto.coverUrl ?? book.coverUrl,
      dto.isbn ?? book.isbn,
      dto.totalPages ?? book.totalPages,
    );

    await this.bookRepository.save(updatedBook);
    return updatedBook;
  }
}
