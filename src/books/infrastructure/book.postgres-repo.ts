// Adaptador salida (Implementación bc)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../domain/book.entity';
import { IBookRepository } from '../domain/book.repository';
import { BookMapper } from './book.mapper';
import { BookTypeORMEntity } from './book.typeorm-entity';

@Injectable()
export class BookPostgresRepository implements IBookRepository {
  constructor(
    // Inyectamos el repositorio nativo de TypeORM
    @InjectRepository(BookTypeORMEntity)
    private readonly ormRepository: Repository<BookTypeORMEntity>,
  ) {}

  async save(book: Book): Promise<void> {
    const ormEntity = BookMapper.toPersistence(book); // Convertir entidad de dominio a TypeORM
    await this.ormRepository.save(ormEntity); // guardar en db
  }

  async findById(id: string): Promise<Book | null> {
    // Buscar 'book' en db
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;
    return BookMapper.toDomain(ormEntity); // convertir TypeORM en domain
  }

  async findAll(
    skip: number,
    take: number,
  ): Promise<{ data: Book[]; total: number }> {
    // findAndCount -> return array -> [datos, total]
    const [ormEntities, total] = await this.ormRepository.findAndCount({
      skip: skip,
      take: take,
      order: { title: 'ASC' }, // ordenar alfabéticamente por título
    });

    // Map TypeORM a Dominio
    const books = ormEntities.map((entity) => BookMapper.toDomain(entity));

    return {
      data: books,
      total: total,
    };
  }
}
