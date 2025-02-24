import { Order } from 'src/orders/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductSize } from './enums/productSize';

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

  @Column({
    type: 'enum',
    enum: ProductSize,
    default: ProductSize.SMALL,
    nullable: true,
  })
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

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @ManyToMany(() => Order, (order) => order.products, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinTable({
    name: 'order_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  })
  orders: Order[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
