import { AppError, LogLevel, Report, StatusCode } from "@expressots/core";
import { provide } from "inversify-binding-decorators";
import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "./create-user.dto";
import { UserRepository } from "@repositories/user/user.repository";
import { User } from "@entities/user.entities";
import { log } from "console";

@provide(CreateUserUseCase)
class CreateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO | null> {
    try {
      const { name, email, password } = data;

      // const user: any = new Promise<{ Id: any, name: any, email: any }>((res) => res({ Id: '', name, email }))
      const user: User | null = await this.userRepository.create(
        { name, email, password, avatar: data?.avatar },
      );

      if (!user) {
        Report.Error(
          new AppError(
            StatusCode.BadRequest,
            "User already exists",
            "create-user-usecase",
          ),
        );
      }

      let response: ICreateUserResponseDTO;

      if (user !== null) {
        response = {
          ...user,
          status: "success",
        };
        return response;
      }

      return null;
    } catch (error: any) {
      log(LogLevel.Error, error, "logger-provider");
      // throw error;
      return null;
    }
  }
}

export { CreateUserUseCase };
