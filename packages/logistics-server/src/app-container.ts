import { AppContainer } from "@expressots/core";
import { LoginModule } from "@useCases/login/login.module";
import { PingModule } from "@useCases/ping/ping.module";
import { UserModule } from "@useCases/user/user.module";

const appContainer = new AppContainer();

const container = appContainer.create([
  PingModule,
  UserModule,
  LoginModule,
],
);

export { container };
