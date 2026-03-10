# 07-restweb

REST API para gestionar TODOs, construida con Express, TypeScript y Prisma ORM.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) y Docker Compose

## Instalacion

```bash
npm install
```

## Configuracion de variables de entorno

Copia el archivo `.env template` y renombralo a `.env`:

```bash
cp ".env template" .env
```

Completa las variables necesarias:

```env
PORT=3000
PUBLIC_PATCH=public

POSTGRES_URL=postgresql://postgres:123456@localhost:5432/NOC
POSTGRES_USER=postgres
POSTGRES_DB=NOC
POSTGRES_PASSWORD=123456
```

## Base de datos

### Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

Esto inicia un contenedor de PostgreSQL 15.3 en el puerto `5432`. Los datos se persisten en la carpeta `./postgres`.

Para detener el contenedor:

```bash
docker compose down
```

### Prisma - Migraciones

**Crear y aplicar una migracion:**

```bash
npx prisma migrate dev --name nombre_de_migracion
```

Este comando:
- Genera el archivo SQL de migracion en `prisma/migrations/`
- Aplica la migracion a la base de datos
- Regenera el Prisma Client en `src/generated/prisma`

**Aplicar migraciones en produccion:**

```bash
npx prisma migrate deploy
```

**Resetear la base de datos** (elimina todos los datos y re-aplica las migraciones):

```bash
npx prisma migrate reset
```

**Regenerar solo el Prisma Client** (sin crear migracion):

```bash
npx prisma generate
```

**Abrir Prisma Studio** (UI para visualizar y editar datos):

```bash
npx prisma studio
```

## Scripts disponibles

| Script | Comando | Descripcion |
|---|---|---|
| Desarrollo | `npm run dev` | Inicia el servidor con hot-reload usando tsx |
| Build | `npm run build` | Compila TypeScript a JavaScript en `dist/` |
| Produccion | `npm start` | Compila y ejecuta la aplicacion |

## Estructura del proyecto

```
├── prisma/
│   └── schema.prisma        # Esquema de la base de datos
├── src/
│   └── generated/prisma/     # Prisma Client (auto-generado)
├── docker-compose.yml        # Configuracion de PostgreSQL
├── prisma.config.ts          # Configuracion de Prisma
├── tsconfig.json             # Configuracion de TypeScript
└── package.json
```