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
  productId: number;

  // If you decide to remove the social_page reference, you can omit this.
  @Column({
    type: 'int',
    nullable: true,
  })
  socialPageId?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

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
    nullable: false,
  })
  heavyWeight: boolean;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  discount?: number;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  inStock: boolean;

  @Column({ type: 'int', nullable: false })
  totalProductsSold: number;

  @Column('text', { nullable: true, name: 'image_url' })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
