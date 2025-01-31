/* eslint-disable import/prefer-default-export */
import {
  IsString, MinLength, MaxLength, IsNotEmpty,
} from 'class-validator';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  @Column({
    unique: true,
  })
    username!: string;

  @IsString()
  @MinLength(1)
  @Column()
    password!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.owner)
    posts!: Post[];
}


