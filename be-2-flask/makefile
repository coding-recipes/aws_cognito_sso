# Command := $(firstword $(MAKECMDGOALS))
Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

dev: 
	bash ./scripts/dev.sh

prod start run: 
	bash ./scripts/prod.sh	

install: 
	bash ./scripts/install.sh $(Arguments)
	exit 1

reinstall: 
	bash ./scripts/reinstall.sh	

save: 
	bash ./scripts/save.sh

