override SHELL := /bin/bash

.PHONY: run-eslint
run-eslint: ## execute eslint
	npx eslint src

.PHONY: fix-eslint 
fix-eslint: ## fix eslint errors
	npx eslint src --fix
	
.PHONY: start-server
start-server:
	echo "Starting mocked server..."
	npx json-server --watch mock-data.json --port 4000
