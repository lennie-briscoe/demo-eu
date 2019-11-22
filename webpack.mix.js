const mix = require('laravel-mix');

/* Mix Plugins */
require('laravel-mix-bundle-analyzer');
require('laravel-mix-critical');
require("laravel-mix-purgecss");

mix
    .setPublicPath('./web')
    .sass('src/css/site.scss', './web/css/')
    .js('src/js/site.js', './web/js/')
    .copy('src/images', './web/images/')
    .copy('src/fonts', './web/fonts/')
    .copy('src/favicon.ico', './web/')
    .copy('src/manifest.json', './web/')
    .copy('src/browserconfig.xml', './web/')

    .options({
        autoprefixer: false,
        processCssUrls: false,
        postCss: [
            require('tailwindcss')('./tailwind.config.js'),
            require('cssnano')(),
        ],
    })

    .purgeCss({
        enabled: mix.inProduction(),
        globs: [
            path.join(__dirname, '/templates/**/*.{html,twig}'),
            path.join(__dirname, '/src/css/**/*.{scss,css}'),
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        extensions: ['html', 'js', 'php', 'twig', 'scss', 'css'],
        whitelist: ['first-load', 'loading', 'is-ie', 'is-device', 'is-phone', 'is-desktop', 'lazypicture', 'lazyloading', 'lazyloaded', 'lazyfade', 'lazyblur', 'animated-gif', 'has-scroll-smooth', 'has-scroll-init', 'has-scroll-scrolling', 'has-scroll-dragging', 'c-scrollbar', 'c-scrollbar_thumb', 'is-inview', 'flickity-button', 'flickity-button-icon', 'previous', 'next', 'arrow', 'flickity-page-dots', '[data-page="home"]', 'active', 'word']
    })

    .critical({
        enabled: mix.inProduction(),
        urls: [
            {
                src: process.env.BASE_URL + '/',
                dest: './templates/home-critical.min.css',
            },
        ],
        options: {
            minify: true,
            width: 1440,
            height: 1200,
        },
    })

    .babelConfig({
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-function-bind',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
        ],
    });

    // .extract();

if (mix.inProduction()) {
    mix.version();
} else if (process.env.MIX_ENV == 'sync') {
    mix
        .sourceMaps(true, 'source-map')
        .browserSync({
            proxy: 'localhost',
            port: 3000,
            files: [
                './web/css/{*,**/*}.css',
                './web/js/{*,**/*}.js',
                './templates/{*,**/*}.{html,twig}',
            ],
        });
} else {
    mix
        .sourceMaps(true, 'source-map');
}

if (mix.isWatching()) {
    mix.bundleAnalyzer();
}
