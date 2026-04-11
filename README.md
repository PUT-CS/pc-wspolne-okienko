# pc-wspolne-okienko

## Run full stack (Postgres + API + Frontend)

```zsh
cp .env.example .env
docker compose up --build -d
docker compose ps
```

Services:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3000`
- Postgres: `localhost:5432`

Stop stack:

```zsh
docker compose down
```

Reset database volume:

```zsh
docker compose down -v
```
