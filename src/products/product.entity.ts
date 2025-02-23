import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  productName: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'description',
  })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  size?: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  heavyWeight?: boolean;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  discount?: number;

  @Column({ type: 'float', nullable: false })
  quantity: number;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  inStock: boolean;

  @Column({ type: 'float', nullable: false })
  totalProductsSold: number;

  @Column('text', { nullable: true, name: 'image_url' })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
