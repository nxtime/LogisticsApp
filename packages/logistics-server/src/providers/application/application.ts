import { Application, Environments, LogLevel, log } from "@expressots/core";
import { AppDataSource } from "data-source";
import { provide } from "inversify-binding-decorators";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserRepository } from "@repositories/user/user.repository";
import cors from 'cors';

@provide(App)
class App extends Application {
  protected async configureServices(): Promise<void> {
    AppDataSource
      .initialize()
      .then(() => {
        log(LogLevel.Info, "Database connection established", "logger-provider");
      })
      .catch((error: any) => {
        log(LogLevel.Error, error, "logger-provider");
      }
      );

    const schema = await buildSchema({
      resolvers: [UserRepository], // @ts-ignore
      validate: { forbidUnknownValues: false }
    });

    const apolloServer = new ApolloServer({
      schema,
      typeDefs: "",
      // debug: true
    });

    apolloServer.listen(4000).then(({ url }) => {
      console.log(`🚀 GraphQL Server ready at ${url}`);
    });

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected postServerInitialization(): void {
    /* empty */
  }

  protected serverShutdown(): void {
    log(LogLevel.Info, "Server is shutting down", "logger-provider");
    super.serverShutdown();
  }
}

const appInstance = new App();

export { appInstance as App };
