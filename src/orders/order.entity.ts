import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderStatus } from './enums/orderStatus.enum';
import { Product } from 'src/products/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNumber: string;

  @Column({ type: 'text' })
  address: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  isExternal: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  externalTrackingId?: string;

  @ManyToMany(() => Product, (product) => product.orders, {
    onDelete: 'RESTRICT',
  })
  products: Product[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
