# wo-db

Local PostgreSQL for this repo.

## Quick start

1. Copy env defaults:

```zsh
cp .env.example .env
```

2. Start database:

```zsh
docker compose up -d
```

3. Check status/logs:

```zsh
docker compose ps
docker compose logs -f postgres
```

Postgres will be available at:
- host: `localhost`
- port: `5432` (or `POSTGRES_PORT`)
- db: `wo`
- user: `wo_user`
- password: `wo_password`

Connection string example:

```text
postgres://wo_user:wo_password@localhost:5432/wo
```

## Stop / cleanup

Stop services:

```zsh
docker compose down
```

Remove data volume too (hard reset):

```zsh
docker compose down -v
```

## Notes

- SQL files in `init/` run only on first container initialization (when volume is empty).
- Current bootstrap creates `lobbies` and `lobby_users` tables.

