import { Setting } from 'src/settings/setting.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  firstName: string;
  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  lastName: string;
  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  googleId: string;

  @OneToOne(() => Setting, (setting) => setting.user, {
    cascade: true,
    eager: true,
  })
  setting: Setting;

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
