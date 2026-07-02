// Puerto (interfaz)
import { Book } from './book.entity';

export interface IBookRepository {
  save(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  // salto (skip) y cantidad (take) -> return un obj con datos y total de registros
  findAll(skip: number, take: number): Promise<{ data: Book[]; total: number }>;
}
// En NestJS se usa Symbol o string como Token de Inyección para la interfaz.
