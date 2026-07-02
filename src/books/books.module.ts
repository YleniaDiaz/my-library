// "pegamento" de Nestjs
// src/books/books.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookService } from './application/create-book.service';
import { FindAllBooksService } from './application/find-all-books.service';
import { BookController } from './infrastructure/book.controller';
import { BookPostgresRepository } from './infrastructure/book.postgres-repo';
import { BookTypeORMEntity } from './infrastructure/book.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookTypeORMEntity])],
  controllers: [BookController],
  providers: [
    CreateBookService,
    FindAllBooksService,
    {
      provide: 'IBookRepository', // token de inyección
      useClass: BookPostgresRepository, // implementación
    },
  ],
})
export class BooksModule {}
