// Map de la tabla SQL
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('books') // Debe coincidir con el nombre de la tabla en bd
export class BookTypeORMEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'external_id', type: 'text', unique: true })
  externalId!: string;

  @Column({ type: 'text', nullable: true })
  isbn!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  author!: string;

  @Column({ name: 'cover_url', type: 'text' })
  coverUrl!: string;

  @Column({ name: 'total_pages', type: 'int', nullable: true })
  totalPages!: number;
}
