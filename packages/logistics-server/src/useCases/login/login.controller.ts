import { BaseController, StatusCode } from "@expressots/core";
import { controller } from "inversify-express-utils";
import { httpPost, requestBody, response } from "inversify-express-utils/lib/decorators";
import { LoginUseCase } from "./login.usecase";
import { LoginResponseDTO } from "./login.dto";

@controller("/login")
class LoginController extends BaseController {
  constructor(private loginUseCase: LoginUseCase) {
    super("default-router-controller");
  }

  @httpPost("")
  async execute(@response() res: any, @requestBody() data: any): Promise<LoginResponseDTO> {

    return this.callUseCase(
      await this.loginUseCase.execute(data),
      res,
      StatusCode.OK,
    );
  }
}

export { LoginController };
