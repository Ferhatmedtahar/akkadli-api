import { Product } from 'src/order_product_managment/products/product.entity';
import { Address } from 'src/settings/addresses/address.entity';
import { Delivery } from 'src/settings/deliveries/delivery.entity';
import { GeneralSettings } from 'src/settings/general-settings/general-settings.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  address?: Address;

  @OneToOne(() => GeneralSettings, (generalSettings) => generalSettings.user, {
    cascade: true,
    eager: true,
  })
  generalSettings?: GeneralSettings;

  @OneToMany(() => Delivery, (delivery) => delivery.user)
  deliveries: Delivery[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
