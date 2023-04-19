import { provide } from "inversify-binding-decorators";
import { User } from "@entities/user.entities";
import { UserRepository } from "@repositories/user/user.repository";
// import { IFindUserResponseDTO } from "./find-user.dto";

@provide(FindUserUseCase)
class FindUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepository.find(userId);
      console.log("Find user: ", user);

      return user;
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindUserUseCase };
