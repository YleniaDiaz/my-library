import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // Cargar .env de forma global
    ConfigModule.forRoot({ isGlobal: true }),

    // Configurar conexión bd
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, // cargar automáticamente todas las entitys de los módulos
        synchronize: true, // Sincronizar esquema del código con la db
        logging: true, // Mostrar en consola las SQL que se ejecutan
      }),
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
