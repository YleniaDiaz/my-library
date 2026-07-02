import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from '../application/create-book.service';
import { BookController } from './book.controller';

describe('BookController', () => {
  let controller: BookController;

  const mockCreateBookService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: CreateBookService,
          useValue: mockCreateBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('debería devolver un mensaje de éxito y los datos del libro', async () => {
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
      message: 'Libro registrado exitosamente',
      data: expectedBook,
    });
    expect(mockCreateBookService.execute).toHaveBeenCalledWith(dto); // verificar que el controlador llamó al servicio
  });
});
