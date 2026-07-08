// "pegamento" de Nestjs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBookService } from './application/create-book.service';
import { FindAllBooksService } from './application/find-all-books.service';
import { FindBookByIdService } from './application/find-book-by-id.service';
import { UpdateBookService } from './application/update-book.service';
import { BookController } from './infrastructure/book.controller';
import { BookPostgresRepository } from './infrastructure/book.postgres-repo';
import { BookTypeORMEntity } from './infrastructure/book.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookTypeORMEntity])],
  controllers: [BookController],
  providers: [
    CreateBookService,
    FindBookByIdService,
    FindAllBooksService,
    UpdateBookService,
    {
      provide: 'IBookRepository', // token de inyección
      useClass: BookPostgresRepository, // implementación
    },
  ],
})
export class BooksModule {}
