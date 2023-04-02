import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ default: false })
  approved: boolean;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({type: "decimal", precision: 10, scale: 4, default: 0})
  lng: number;

  @Column({type: "decimal", precision: 10, scale: 4, default: 0})
  lat: number;

  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  mileage: number;

  @ManyToOne(() => User, user => user.reports)
  user: User;

  @ManyToOne(() => User, user => user.reportsApproved)
  userApproved: User;
}