install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff -h:
	node bin/gendiff.js -h

gendiff --help:
	node bin/gendiff.js -h

gendiff -V:
	node bin/gendiff.js -V

gendiff --version:
	node bin/gendiff.js -V

gendiff:
	node bin/gendiff.js

test:
	npx jest --watch

test-coverage:
	npx jest --coverage --watch --coverageProvider=v8

.PHONY: gendiff
.PHONY: test
