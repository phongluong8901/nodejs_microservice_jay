import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: "postgresql://catalog_db:Condien123@172.26.88.47:5432/catalog_service?schema=public&sslmode=disable",
    },
  }),
});