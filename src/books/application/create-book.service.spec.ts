import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from '../infrastructure/dto/create-book.dto';
import { CreateBookService } from './create-book.service';

describe('CreateBookService', () => {
  let service: CreateBookService;

  // Crear "Mock" del repositorio y solo simular 'save'
  const mockBookRepository = { save: jest.fn() };

  beforeEach(async () => {
    // Configurar módulo de pruebas
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookService,
        {
          provide: 'IBookRepository', // Inyectar token repositorio
          useValue: mockBookRepository, // usar mock en vez de la db
        },
      ],
    }).compile();

    service = module.get<CreateBookService>(CreateBookService);
  });

  it('debería estar definido', () => expect(service).toBeDefined());

  it('debería crear un libro y llamar al repositorio para guardarlo', async () => {
    // Datos de entrada de prueba
    const dto: CreateBookDto = {
      externalId: 'ext-123',
      title: 'El Quijote',
      author: 'Cervantes',
      coverUrl: 'http://imagen.com/portada.jpg',
      totalPages: 1000,
    };

    const result = await service.execute(dto); // ejecutar caso de uso

    expect(result.title).toEqual('El Quijote'); // verificar título
    expect(result.id).toBeDefined(); // verificar UUID
    expect(mockBookRepository.save).toHaveBeenCalledTimes(1); // verificar que solo se llamó una vez al save
    expect(mockBookRepository.save).toHaveBeenCalledWith(result); // comprobar que se llamó con el obj correcto (el que generó el servicio)
  });
});
