import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FindBookByIdService } from './find-book-by-id.service';

describe('FindBookByIdService', () => {
  let service: FindBookByIdService;
  const mockBookRepository = { findById: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindBookByIdService,
        {
          provide: 'IBookRepository',
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<FindBookByIdService>(FindBookByIdService);
  });

  it('debería devolver un libro si el ID existe en la base de datos', async () => {
    const bookId = '123e4567-e89b-12d3-a456-426614174000';
    const expectedBook = {
      id: bookId,
      title: 'Código Limpio',
      author: 'Robert C. Martin',
    };

    mockBookRepository.findById.mockResolvedValue(expectedBook);

    const result = await service.execute(bookId);
    expect(result).toEqual(expectedBook);
    expect(mockBookRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockBookRepository.findById).toHaveBeenCalledWith(bookId);
  });

  it('debería lanzar una NotFoundException si el libro NO existe', async () => {
    const bookId = 'unexistent-id';

    mockBookRepository.findById.mockResolvedValue(null);

    await expect(service.execute(bookId)).rejects.toThrow(NotFoundException);
    await expect(service.execute(bookId)).rejects.toThrow(
      `Book with id: ${bookId} not found`,
    );
    expect(mockBookRepository.findById).toHaveBeenCalledWith(bookId);
  });
});
