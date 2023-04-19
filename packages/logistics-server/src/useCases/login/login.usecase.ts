import { provide } from "inversify-binding-decorators";
import { AppDataSource } from "data-source";
import { User } from "@entities/user.entities";
import bcrypt from 'bcrypt';

@provide(LoginUseCase)
class LoginUseCase {
  public userRepository = AppDataSource.getRepository(User)
  async execute(data: { email: string, password: string }): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: data.email } });

      if (!user) throw new Error("User not found");

      const isPasswordValid = await bcrypt.compare(data.password, user.password);

      if (!isPasswordValid) throw new Error("Invalid password");

      return user;
    } catch (err: any) {
      throw err;
    }
  }
}

export { LoginUseCase };
