declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_NAME: string;
    MONGO_DB_PWD: string;
    MONGO_DB_USER: string;
    MONGO_DB_ADDRESS: string;
    MONGO_DB_PORT: string;

    MYSQL_DB_NAME: string;
    MYSQL_DB_PWD: string;
    MYSQL_DB_USER: string;
    MYSQL_DB_ADDRESS: string;
    MYSQL_DB_PORT: string;

    NODE_ENV: 'development' | 'production';
  }
}
