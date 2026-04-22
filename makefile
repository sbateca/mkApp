override SHELL := /bin/bash

.PHONY: run-eslint
run-eslint: ## execute eslint
	npx eslint src

.PHONY: fix-eslint 
fix-eslint: ## fix eslint errors
	npx eslint src --fix

.PHONY: server
server:
	echo "Starting mocked server..."
	node server.cjs

.PHONY: run
run:
	echo "Starting frontend..."
	npm run dev

.PHONY: format
format:
	echo "Formating the code..."
	npm run format

.PHONY: lint
lint:
	echo "Running lint..."
	npm run lint

