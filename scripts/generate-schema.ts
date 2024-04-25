import * as fs from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

config();

const databaseUrl =
  process.env.NODE_ENV === 'production'
    ? 'POSTGRES_PRISMA_URL'
    : 'DATABASE_LOCAL_URL';

const envMode =
  process.env.NODE_ENV === 'production'
    ? 'production mode'
    : 'development mode';

const schema = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema
// ${envMode}

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("${databaseUrl}")
}

enum PopularStatus {
  POPULAR
  NOTPOPULAR
}

enum ActiveStatus {
  IsActive
  NotActive
}

model User {
  id        String       @id @unique @default(uuid()) @map("id")
  fullName  String       @map("fullname")
  email     String       @unique @map("email")
  password  String       @map("password")
  status    ActiveStatus @default(IsActive) @map("status")
  createAt  DateTime     @default(now()) @map("created_at") @db.Timestamp(6)
  updatedAt DateTime     @updatedAt @map("updated_at") @db.Timestamp(6)

  @@index([id, fullName, email])
  @@map("users")
}

model Genre {
  id     String  @id @unique @default(uuid()) @map("id")
  name   String  @unique @map("name") @db.VarChar(100)
  movies Movie[]

  @@index([id, name])
  @@map("genres")
}

model Movie {
  id          String        @id @unique @default(uuid()) @map("id")
  title       String        @map("title")
  description String        @map("description")
  genres      Genre[]
  imgUrl      String        @map("img_url")
  director    String        @map("director")
  rate        String        @map("rate")
  isPopular   PopularStatus @default(POPULAR) @map("is_popular")
  releaseDate DateTime      @map("release_date") @db.Date
  year        String        @map("year")
  createAt    DateTime      @default(now()) @map("created_at") @db.Timestamp(6)
  updatedAt   DateTime      @default(now()) @updatedAt @map("updated_at") @db.Timestamp(6)

  @@index([id, title, rate, year, isPopular])
  @@map("movies")
}
`;

switch (process.env.NODE_ENV) {
  case 'production':
    fs.writeFileSync(join(__dirname, '../../prisma/schema.prisma'), schema);
    break;
  default:
    fs.writeFileSync(join(__dirname, '../prisma/schema.prisma'), schema);
    break;
}
