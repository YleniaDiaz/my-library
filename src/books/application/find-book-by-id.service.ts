import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../domain/book.entity';
import type { IBookRepository } from '../domain/book.repository';

@Injectable()
export class FindBookByIdService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) throw new NotFoundException(`Book with id: ${id} not found`);
    return book;
  }
}
