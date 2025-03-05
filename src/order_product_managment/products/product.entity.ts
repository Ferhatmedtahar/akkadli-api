import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from '../order-product/order-product.entity';
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
    default: false,
  })
  heavyWeight?: boolean;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true, default: 0 })
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

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
