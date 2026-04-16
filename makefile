override SHELL := /bin/bash

.PHONY: run-eslint
run-eslint: ## execute eslint
	npx eslint src

.PHONY: fix-eslint 
fix-eslint: ## fix eslint errors
	npx eslint src --fix

.PHONY: start
start:
	echo "Starting mocked server..."
	node server.cjs
