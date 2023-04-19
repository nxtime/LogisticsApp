import { provide } from "inversify-binding-decorators";
import { UserRepository } from "@repositories/user/user.repository";
// import { IRemoveUserResponseDTO } from "./remove-user.dto";

@provide(RemoveUserUseCase)
class RemoveUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(userId: string): Promise<{ message: string } | null> {
    try {
      const isDeleted = await this.userRepository.delete(userId);

      return { message: isDeleted ? `User ${userId} removed` : `User ${userId} was not removed ` }
    } catch (error: any) {
      throw error;
    }
  }
}

export { RemoveUserUseCase };
