import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from '../application/create-book.service';
import { FindAllBooksService } from '../application/find-all-books.service';
import { FindBookByIdService } from '../application/find-book-by-id.service';
import { UpdateBookService } from '../application/update-book.service';
import { BookController } from './book.controller';

describe('BookController', () => {
  let controller: BookController;

  const mockCreateBookService = { execute: jest.fn() };
  const mockFindAllBooksService = { execute: jest.fn() };
  const mockFindBookByIdService = { execute: jest.fn() };
  const mockUpdateBookService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: CreateBookService,
          useValue: mockCreateBookService,
        },
        {
          provide: FindAllBooksService,
          useValue: mockFindAllBooksService,
        },
        {
          provide: FindBookByIdService,
          useValue: mockFindBookByIdService,
        },
        {
          provide: UpdateBookService,
          useValue: mockUpdateBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('debería devolver un mensaje de éxito tras crear y los datos del libro', async () => {
    const dto = {
      externalId: 'ext-123',
      title: 'El Quijote',
      author: 'Cervantes',
      coverUrl: 'http://imagen.com/portada.jpg',
    };
    const expectedBook = { id: 'uuid-generado', ...dto };
    mockCreateBookService.execute.mockResolvedValue(expectedBook); // Mock debe responder cuando se llame a execute()
    const response = await controller.createBook(dto);

    // Verificar estructura de respuesta
    expect(response).toEqual({
      message: 'Added book successfully',
      data: expectedBook,
    });
    expect(mockCreateBookService.execute).toHaveBeenCalledWith(dto); // verificar que el controlador llamó al servicio
  });

  it('debería devolver un mensaje de éxito y los datos de los libros', async () => {
    const paginationDto = { page: 1, limit: 10 };
    const expectedResult = {
      message: 'Found all books successfully',
      data: [
        { id: 'uuid-1', title: 'Libro 1', author: 'Autor 1' },
        { id: 'uuid-2', title: 'Libro 2', author: 'Autor 2' },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
    };
    mockFindAllBooksService.execute.mockResolvedValue(expectedResult);
    const response = await controller.findAllBooks(paginationDto);

    expect(response).toEqual(expectedResult);
    expect(mockFindAllBooksService.execute).toHaveBeenCalledWith(paginationDto);
  });

  it('debería devolver un mensaje de éxito y los datos del libro', async () => {
    const bookId = '123e4567-e89b-12d3-a456-426614174000';
    const expectedBook = {
      id: bookId,
      title: 'Código Limpio',
      author: 'Robert C. Martin',
    };
    mockFindBookByIdService.execute.mockResolvedValue(expectedBook);
    const response = await controller.findById(bookId);

    expect(response).toEqual({
      message: 'Found book successfully',
      data: expectedBook,
    });
    expect(mockFindBookByIdService.execute).toHaveBeenCalledWith(bookId);
  });

  it('debería devolver un mensaje de éxito tras actualizar y los datos del libro', async () => {
    const dto = {
      externalId: 'ext-123',
      title: 'El Quijote',
      author: 'Cervantes',
      coverUrl: 'http://imagen.com/portada.jpg',
    };
    const expectedBook = { id: 'uuid-generado', ...dto };
    mockUpdateBookService.execute.mockResolvedValue(expectedBook);
    const response = await controller.updateBook('book-123', dto);

    expect(response).toEqual({
      message: 'Updated book successfully',
      data: expectedBook,
    });
    expect(mockUpdateBookService.execute).toHaveBeenCalledWith('book-123', dto);
  });
});
