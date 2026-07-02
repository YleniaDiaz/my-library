// Puerto (interfaz)
import { Book } from './book.entity';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
}
// En NestJS se usa Symbol o string como Token de Inyección para la interfaz.
