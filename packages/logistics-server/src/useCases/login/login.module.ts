import { CreateModule } from "@expressots/core";
import { LoginController } from "./login.controller";

const LoginModule = CreateModule([
  // Add your modules here
  LoginController,
]);

export { LoginModule };
