import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpDelete, requestParam, response } from "inversify-express-utils";
import { RemoveUserUseCase } from "./remove-user.usecase";
import { User } from "@entities/user.entities";

@controller("/user/remove")
class RemoveUserController extends BaseController {
  constructor(private removeUserUseCase: RemoveUserUseCase) {
    super("remove-user-controller");
  }

  @httpDelete("/:userId")
  async execute(@response() res: any, @requestParam('userId') userId: string): Promise<User> {
    return this.callUseCase(
      await this.removeUserUseCase.execute(userId),
      res,
      StatusCode.OK,
    );
  }
}

export { RemoveUserController };
