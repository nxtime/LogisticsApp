import { CreateModule } from "@expressots/core";
import { CreateUserController } from "./create/create-user.controller";
import { FindAllUserController } from "./findall/findall-user.controller";
import { FindUserController } from "./find/find-user.controller";
import { RemoveUserController } from "./remove/remove-user.controller";

const UserModule = CreateModule([CreateUserController, FindAllUserController, FindUserController, RemoveUserController]);

export { UserModule };
