import { provide } from "inversify-binding-decorators";
import { IBaseRepository } from "./base-repository.interface";
import { IEntity } from "@entities/base.entity";
import { AppDataSource } from "data-source";
import { log } from "console";
import { LogLevel } from "@expressots/core";

@provide(BaseRepository)
class BaseRepository<T> implements IBaseRepository<T> {
  async create(item: T): Promise<T | null> {
    // this.USERDB.push(item);
    log(LogLevel.Info, "Creating a user", "logger-provider");
    AppDataSource.manager.save(item);
    return item;
  }

  update(item: T) {
    return item;
  }

  async delete(id: string): Promise<boolean> {
    // const index: number = this.USERDB.findIndex((item) => item.Id === id);

    return false;
  }

  async find(id: string): Promise<T | null> {
    // const user = this.USERDB.find((item) => item.Id === id);
    const user = "";
    return await new Promise((res) => (user || null));
  }

  async findAll(): Promise<T[]> {
    return await new Promise((res) => ([]));
  }
}

export { BaseRepository };
