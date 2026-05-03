FROM postgres:17

# F1DB native dump + app schema bootstrap.
# init.sh creates schemas, sets search_path, and loads the dump under f1db,
# then applies app schema DDL. Dump itself sits outside docker-entrypoint-initdb.d
# so the postgres image's auto-runner doesn't try to load it into `public`.
COPY ./entrypoint/init.sh                        /docker-entrypoint-initdb.d/00_init.sh
COPY ./entrypoint/f1db.sql                       /dump/f1db.sql
COPY ./entrypoint/app_schema.sql                 /dump/app_schema.sql
COPY ./migrations/apply_team_rename.sql          /migrations/apply_team_rename.sql

RUN chmod +x /docker-entrypoint-initdb.d/00_init.sh

EXPOSE 5432
