import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  apiId: string;

  @Column({ type: 'varchar', length: 255 })
  apiToken: string;

  @ManyToOne(() => User, (user) => user.deliveries)
  user: User;
}
