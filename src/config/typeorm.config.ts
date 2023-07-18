import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbconfig = config.get('db');
export const typeOrm: TypeOrmModuleOptions = {
  type: dbconfig.type,
  host: process.env.RDS_HOSTNAME || dbconfig.host,
  database: process.env.RDS_DB_NAME || dbconfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC || dbconfig.synchronize,
};
