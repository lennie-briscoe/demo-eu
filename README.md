# Craft Demo - Starter

Website by [**vanholtzco**](https://vanholtz.co)

---

## Collaborators
- [@**vanholtzco**](https://twitter.com/vanholtzco) Eric Van Holtz (Developer)
- Sam Hernandez (Pixel & Tonic - Developer)

# Local Environment Instructions

- Clone this repo
- Create a database
- Duplicate the **.env.example** file and rename it **.env**
- Modify the **.env** file with your local database information and Security Key
  - Update the **BASE_PATH** and  **BASE_URL**
  - Generate a cryptographically secure key, preferably using a password generator like 1Password. (There’s no length limit.)
  - Paste your security key inside the quotes and save the file. `SECURITY_KEY=""`
  - Run `./craft setup/security-key`
- Run `composer install`
- Point your local web server to the `/web` directory
- Run `yarn install`
- Finish up the Craft CMS 3 install [admin/](http://localhost/admin)
  - Update Craft to the latest version [admin/utilities/updates](http://localhost/admin/utilities/updates)
  - Install any plugins needed [admin/settings/plugins](http://localhost/admin/settings/plugins)
  - Create [Sections](http://localhost/admin/settings/sections) and [Entries](http://localhost/admin/entries/)
- Run `yarn watch`, `yarn sync`, `yarn dev`, or `yarn prod` to compile the project
- The local site should now be accessible

## Development Technologies

- [Craft CMS 3](https://docs.craftcms.com/v3/)
- MySQL (5.5+)
- PHP (7+), and built on the [Yii 2 framework](https://www.yiiframework.com/)

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
- [TailwindCSS](https://tailwindcss.com/docs/)
- [LocomotiveScroll](https://github.com/locomotivemtl/locomotive-scroll)

## Additional Craft CMS 3 Information

- [Server Requirements](https://docs.craftcms.com/v3/requirements.html)
- [Installation Instructions](https://docs.craftcms.com/v3/installation.html)
