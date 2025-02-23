import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column(() => Address)
  // defaultAddress: Address;

  // @OneToMany(() => DeliveryPlatform, (platform) => platform.settings, {
  //   cascade: true,
  // })
  // deliveryPlatforms: DeliveryPlatform[];

  // @OneToOne(() => User, (user) => user.settings)
  // user: User;
}
