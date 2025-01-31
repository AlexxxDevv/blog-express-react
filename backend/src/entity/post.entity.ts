/* eslint-disable import/prefer-default-export */
import {
  IsString, MinLength, MaxLength, IsNotEmpty,
} from 'class-validator';
import {
  PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, Entity,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
    id!: number;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  @Column()
    text!: string;

  @ManyToOne(() => User, (user) => user.posts)
    owner!: User;
}
