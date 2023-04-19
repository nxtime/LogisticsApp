import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, requestParam, response } from "inversify-express-utils";
import { FindUserUseCase } from "./find-user.usecase";
import { User } from "@entities/user.entities";

@controller("/user/find")
class FindUserController extends BaseController {
  constructor(private findUserUseCase: FindUserUseCase) {
    super("find-user-controller");
  }

  @httpGet("/:userId")
  async execute(@response() res: any, @requestParam('userId') userId: string): Promise<User> {
    console.log("User id: ", userId);
    return this.callUseCase(
      await this.findUserUseCase.execute(userId),
      res,
      StatusCode.OK,
    );
  }
}

export { FindUserController };
