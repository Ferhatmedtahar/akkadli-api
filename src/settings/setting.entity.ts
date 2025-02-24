import { Address } from 'cluster';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  city: string;
  // @OneToOne(() => Address, (address) => address.setting, {
  //     cascade: true,
  //     eager: true,
  //   })
  //   defaultAddress: Address;

  // @OneToMany(() => DeliveryPlatform, (platform) => platform.settings, {
  //   cascade: true,
  // })
  // deliveryPlatforms: DeliveryPlatform[];

  @OneToOne(() => User, (user) => user.setting, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
