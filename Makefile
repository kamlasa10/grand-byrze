install:
	npm install
template:
	node src/static/create-component $(name)
lint:
	npx eslint ./src/assets/scripts/**/*.js ./src/assets/scripts/*.js ./src/pug/components/**/*.js
lint-w:
	npx eslint ./src/assets/scripts/**/*.js ./src/assets/scripts/*.js ./src/pug/components/**/*.js --fix
prettier:
<<<<<<< HEAD
	npx prettier --write ./src/assets/scripts/**/*.js ./src/assets/scripts/*.js ./src/pug/components/**/*.js
=======
	npx prettier --write ./src/assets/scripts/**/*.js ./src/assets/scripts/*.js ./src/pug/components/**/*.js
>>>>>>> 15028534acc8e51d9cb47c193a30708f73a3ec9c
