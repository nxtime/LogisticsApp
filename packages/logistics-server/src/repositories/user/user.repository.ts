import { provide } from "inversify-binding-decorators";
import { User } from "@entities/user.entities";
import { BaseRepository } from "@repositories/base-repository";
import { AppDataSource } from "data-source";
import { LogLevel, log } from "@expressots/core";
import bcrypt from 'bcrypt';
import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { CreateUserInput } from "@entities/create-user.entity";

@provide(UserRepository)
@Resolver((_type) => User)
class UserRepository extends BaseRepository<User> {
  public userRepository = AppDataSource.getRepository(User);
  constructor() {
    super();
  }

  @Mutation((_type) => User)
  public async create(@Arg("data", { nullable: false }) newUser: CreateUserInput): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = new User(newUser.name, newUser.email, hashedPassword);

    const newUserRepo = this.userRepository.create(user)
    const theNewUser = await this.userRepository.save(newUserRepo);

    return theNewUser;
  }

  @Query((_type) => User)
  async find(@Arg('userId') userId: string): Promise<User | null> {
    const user = await this.userRepository
      .findOne({ where: { id: Number(userId) } });

    return user;
  }

  @Query((_type) => [User])
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation((_type) => User)
  async delete(@Arg('userID') userId: string): Promise<boolean> {
    const hasDeleted = await this.userRepository.delete({ id: Number(userId) });
    return hasDeleted ? true : false;
  }
}

export { UserRepository };
