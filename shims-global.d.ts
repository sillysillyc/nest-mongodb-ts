declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string;
    DB_PWD: string;
    DB_USER: string;
    DB_ADDRESS: string;
    DB_PORT: string;
    NODE_ENV: 'development' | 'production';
  }
}
