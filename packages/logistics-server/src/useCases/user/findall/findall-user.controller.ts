import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { FindAllUserUseCase } from "./findall-user.usecase";
import { User } from "@entities/user.entities";

@controller("/user/findall")
class FindAllUserController extends BaseController {
  constructor(private findAllUserUseCase: FindAllUserUseCase) {
    super("findall-user-controller");
  }

  @httpGet("/")
  async execute(@response() res: any): Promise<User[]> {
    return this.callUseCase(
      await this.findAllUserUseCase.execute(),
      res,
      StatusCode.OK,
    );
  }
}

export { FindAllUserController };
