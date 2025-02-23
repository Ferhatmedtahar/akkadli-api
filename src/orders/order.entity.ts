import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';

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
    type: 'varchar',
    // type: 'enum',
    // enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    // default: 'pending',
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  isExternal: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  externalTrackingId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
