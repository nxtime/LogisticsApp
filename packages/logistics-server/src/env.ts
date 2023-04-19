/* eslint-disable prettier/prettier */
import pkg from "../package.json";

const ENV = {
  Application: {
    APP_NAME: pkg.name,
    APP_VERSION: pkg.version,
    ENVIRONMENT: process.env.ENVIRONMENT as string,
    PORT: Number(process.env.PORT),
    // VSCODE_GIT_ASKPASS_EXTRA_ARGS: String(process.env.VSCODE_GIT_ASKPASS_EXTRA_ARGS) as string,
    // NVM_RC_VERSION: process.env.NVM_RC_VERSION as string,
  },
  Log: {
    FILE: process.env.FILE as string,
    FOLDER: process.env.FOLDER as string,
  },
};

export default ENV;
