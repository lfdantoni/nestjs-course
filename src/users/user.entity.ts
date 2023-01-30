// import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;


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