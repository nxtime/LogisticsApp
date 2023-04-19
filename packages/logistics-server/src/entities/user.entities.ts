import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { IsEmail, MinLength, NotContains } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @Field((_type) => Number, { nullable: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  public name!: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  public password!: string;

  @Field(() => String, { nullable: true, defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' })
  @Column({ nullable: true, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' })
  public avatar!: string;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt!: Date;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ name: 'created_at' })
  public createdAt!: Date;

  @Field(() => String, { nullable: true })
  @Column({ unique: true })
  @IsEmail()
  public email!: string;

  @Field(() => String, { nullable: true })
  @Column({ default: 'user' })
  public role!: "admin" | "user";
}
