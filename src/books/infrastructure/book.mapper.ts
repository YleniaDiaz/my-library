import { Book } from '../domain/book.entity';
import { BookTypeORMEntity } from './book.typeorm-entity';

export class BookMapper {
  // db -> dominio
  static toDomain(raw: BookTypeORMEntity): Book {
    return new Book(
      raw.id,
      raw.externalId,
      raw.title,
      raw.author,
      raw.coverUrl,
      raw.isbn,
      raw.totalPages,
    );
  }

  // dominio -> db
  static toPersistence(book: Book): BookTypeORMEntity {
    const entity = new BookTypeORMEntity();
    entity.id = book.id;
    entity.externalId = book.externalId;
    entity.title = book.title;
    entity.author = book.author;
    entity.coverUrl = book.coverUrl;
    entity.isbn = book.isbn || '';
    entity.totalPages = book.totalPages || 0;

    return entity;
  }
}
