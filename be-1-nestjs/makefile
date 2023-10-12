# Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
# Argument2 := $(word 2,$(MAKECMDGOALS))

copydb:
	cp /mnt/c/sqlite3/dbs/sso_database.db ./assets


migrate:
	npx typeorm migration:create ./migration/migration
