import { Inject, Injectable } from '@nestjs/common';
import type { IBookRepository } from '../domain/book.repository';
import { PaginationDto } from '../infrastructure/dto/pagination.dto';

@Injectable()
export class FindAllBooksService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(dto: PaginationDto) {
    // Valores por defecto por si no vienen en URL
    const page = dto.page || 1;
    const limit = dto.limit || 10;
    const skip = (page - 1) * limit; // cálculo del offset (cuantos registros nos saltamos)
    const result = await this.bookRepository.findAll(skip, limit); // llamar al repository
    const totalPages = Math.ceil(result.total / limit); // calcular total de páginas (redondear hacia arriba)

    // Return datos y metadatos
    return {
      data: result.data,
      meta: {
        totalItems: result.total,
        itemsPerPage: limit,
        currentPage: page,
        totalPages: totalPages,
      },
    };
  }
}
