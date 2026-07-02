import { Test, TestingModule } from '@nestjs/testing';
import { FindAllBooksService } from './find-all-books.service';

describe('FindAllBooksService', () => {
  let service: FindAllBooksService;
  const mockBookRepository = { findAll: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllBooksService,
        {
          provide: 'IBookRepository',
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<FindAllBooksService>(FindAllBooksService);
  });

  it('debería devolver la estructura paginada y calcular correctamente los metadatos', async () => {
    const dto = { page: 1, limit: 10 };
    // Respuesta db
    const mockDbResponse = {
      data: [
        { id: 'uuid-1', title: 'Libro 1', author: 'Autor 1' },
        { id: 'uuid-2', title: 'Libro 2', author: 'Autor 2' },
      ],
      total: 2,
    };
    mockBookRepository.findAll.mockResolvedValue(mockDbResponse);

    // Data después de pasar por el service
    const expectedServiceResult = {
      data: mockDbResponse.data,
      meta: {
        totalItems: 2,
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: 1, // 2 items / 10 por página = 0.2 -> redondear = 1
      },
    };
    const result = await service.execute(dto);

    expect(result).toEqual(expectedServiceResult);
    expect(mockBookRepository.findAll).toHaveBeenCalledTimes(1);
    expect(mockBookRepository.findAll).toHaveBeenCalledWith(0, 10);
  });
});
