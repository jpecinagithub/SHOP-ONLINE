# SHOP ONLINE

## Requisitos
- Node.js 18+
- MySQL 8+

## 1) Clonar el repo
```bash
git clone <URL_DEL_REPO>
cd "SHOP ONLINE"
```

## 2) Base de datos
1. Crea una base de datos MySQL, por ejemplo `shop_online`.
2. Ejecuta el esquema:
```sql
SOURCE database/schema.sql;
```
3. (Opcional) Carga datos de ejemplo:
```sql
SOURCE database/seed.sql;
```

## 3) Backend (API)
1. Crea el archivo `api/.env` con:
```
PORT=3001
CORS_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=shop_online
JWT_SECRET=change-me
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL_DAYS=30
JWT_ISSUER=shop-online
JWT_AUDIENCE=shop-online-users
```
2. Instala dependencias y levanta:
```bash
cd api
npm install
npm run dev
```

## 4) Frontend (Web)
1. Crea `web/.env`:
```
VITE_API_URL=http://localhost:3001
```
2. Instala dependencias y levanta:
```bash
cd web
npm install
npm run dev
```

## 5) Probar
- Web: `http://localhost:5173`
- API health: `http://localhost:3001/health`
