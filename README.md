# Europa Museum - a marketing demo site

Website by [**vanholtzco**](https://vanholtz.co)

---

## Collaborators
- [@**vanholtzco**](https://twitter.com/vanholtzco) Eric Van Holtz (Developer)
- Sam Hernandez (Pixel & Tonic - Developer)

# Local Environment Instructions

This assumes you have your preferred localhosting method: MAMP, Valet, etc.

## Clone

Clone this repo and get into the new folder it created.

```bash
git clone git@github.com:pixelandtonic/demo-europa-museum.git
cd demo-europa-museum
```

Or, choose your own folder name.

```bash
git clone git@github.com:pixelandtonic/demo-europa-museum.git europa
cd europa
```

## Install dependencies

Use `yarn` instead of `npm`. The `yarn.lock` file enforces consistency between collaborators.

```bash
composer install
yarn install
```

## Create a database

Use PostgreSQL rather than MySQL. You can use MySQL, but won't be able to dump or import from staging or production environments to get content.

We'll just use the default `postgres` user. That user does not need a password.

If you have Postgres installed on a Mac with Homebrew, you should be able to run this.

Note: All examples assume your database is named `europa`. Swap with your chosen database name if different.

```bash
createdb -U postgres europa
```

To list databases get into the postgres shell with the default `postgres` user.

```bash
psql -U postgres
```

The prompt will be `postgres#`. Run `\l` (backslash and lower case L)  to list databases.

```bash
postgres# \l
```

Exit with `\q`.

```bash
username# \q
```

To drop a database run this.

```bash
dropdb -U postgres europa
```

If it throws an error saying that there are other connections using it then run these two lines. (Change `europa` to the name of your database.)

```bash
psql -U postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'europa' AND pid <> pg_backend_pid();"
dropdb -U postgres europa
```

## Install Craft

This command will:

* Set up your `.env` values
* Test your database connection
* Let you install Craft if the database connection was ok

```bash
./craft setup
```

If that fails, you can try it again, or manually set up the `.env` file and run `./craft install`.

Project Config will automatically create all fields, sections, and other settings.

Just in case Craft or its plugins aren't up to date, run this.

```bash
./craft update
```

## Front-end Development

Be sure to add the following environment variable to `.env` or the production build process will fail:

```
DEFAULT_SITE_URL=https://europamuseum.co
```

There are a few commands you can run, found in `package.json`:

* `yarn watch`
* `yarn sync`
* `yarn dev`
* `yarn prod`

## Development Technologies

- [Craft CMS 3](https://docs.craftcms.com/v3/)
- PostgreSQL (11.5+) / MySQL (5.7+)
- PHP (7.0+), and built on the [Yii 2 framework](https://www.yiiframework.com/)

### devDependencies
- [Babel](https://babeljs.io/) with ES6
- [Sass](https://sass-lang.com/)
- [Laravel Mix](https://github.com/JeffreyWay/laravel-mix#readme) (Webpack)
  - [PurgeCSS](https://github.com/spatie/laravel-mix-purgecss#readme)
  - [Critical CSS](https://github.com/riasvdv/laravel-mix-critical#readme)

### Dependencies
- [Highway.js](https://highway.js.org/)
- [GSAP](https://greensock.com/gsap)
- [Lazysizes](https://github.com/aFarkas/lazysizes#readme)
- [LocomotiveScroll](https://github.com/locomotivemtl/locomotive-scroll)

## Additional Craft CMS 3 Information

- [Server Requirements](https://docs.craftcms.com/v3/requirements.html)
- [Installation Instructions](https://docs.craftcms.com/v3/installation.html)
