# composer dependencies
FROM composer:1 AS vendor
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install --ignore-platform-reqs --no-interaction --prefer-dist

# install node dependencies
FROM node:12-alpine AS nodebuilder
RUN apk add --no-cache git
COPY src .
COPY web .
COPY package.json .
COPY yarn.lock .
COPY .snyk .
COPY webpack.mix.js .
RUN yarn install
RUN npm run prod

FROM craftcms/nginx:7.4

# the user is `www-data`, so we copy the files using the user and group
COPY --chown=www-data:www-data --from=vendor /app/vendor/ /app/vendor/
COPY --chown=www-data:www-data . .
