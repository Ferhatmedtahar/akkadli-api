import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class DeliveryPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  apiId: string;

  @Column({ type: 'varchar', length: 255 })
  apiToken: string;

  // @ManyToOne(() => Settings, (settings) => settings.deliveryPlatforms)
  // settings: Settings;
}
