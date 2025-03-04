import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'float', nullable: false })
  priceAtPurchase: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
