import { provide } from "inversify-binding-decorators";
import { User } from "@entities/user.entities";
import { UserRepository } from "@repositories/user/user.repository";
import { IFindAllUserResponseDTO } from "./findall-user.dto";

@provide(FindAllUserUseCase)
class FindAllUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(): Promise<User[] | null> {
    try {
      const users = await this.userRepository.findAll();

      return users;
    } catch (error: any) {
      throw error;
    }
  }
}

export { FindAllUserUseCase };
