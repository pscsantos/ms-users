import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  BeforeInsert,
  BeforeUpdate, 
} from 'typeorm';
import { IsBoolean, IsEmail, IsInt, IsNumber, isNumber, IsString } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity({
  name: "users"
})
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;
  
  @Column({type: 'varchar'})
  @IsString()
  name: string;

  @Column({type: 'varchar'})
  @IsEmail()
  email: string;

  @Column({type: 'varchar'})
  @IsNumber()
  cpf: string;

  @Column({type: 'varchar', select: false})
  @IsString()
  password: string;

  @Column({type: 'boolean'})
  @IsBoolean()
  seller: Boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}