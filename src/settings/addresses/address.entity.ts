import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  wilaya: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  municipality: string;

  //1000 , 48000 , 58000
  @Column({
    type: 'int',
  })
  postalCode: number;

  @OneToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
