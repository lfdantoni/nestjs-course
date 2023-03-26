// import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, OneToMany } from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Report, report => report.userApproved)
  reportsApproved: Report[];

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user', this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log('Updated user', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user', this.id)
  }
}