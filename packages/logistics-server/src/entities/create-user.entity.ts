import { Field, InputType } from 'type-graphql';
import { User } from './user.entities';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  role?: "admin" | "user";
}