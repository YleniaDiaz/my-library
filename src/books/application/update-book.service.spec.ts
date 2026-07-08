import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBookDto } from '../infrastructure/dto/update-book.dto';
import { UpdateBookService } from './update-book.service';

describe('UpdateBookService', () => {
  let service: UpdateBookService;
  const mockBookRepository = {
    save: jest.fn(),
    findById: jest.fn().mockResolvedValue({
      id: 'book-123',
      title: 'El Quijote',
      author: 'Cervantes',
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBookService,
        {
          provide: 'IBookRepository',
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateBookService>(UpdateBookService);
  });

  it('debería estar definido', () => expect(service).toBeDefined());

  it('debería actualizar un libro y llamar al repositorio para guardarlo', async () => {
    const dto: UpdateBookDto = {
      title: 'El Quijote Actualizado',
      author: 'Cervantes',
    };
    const result = await service.execute('book-123', dto);

    expect(result.title).toEqual('El Quijote Actualizado');
    expect(result.id).toBeDefined();
    expect(mockBookRepository.save).toHaveBeenCalledTimes(1);
    expect(mockBookRepository.save).toHaveBeenCalledWith(result);
  });
});
