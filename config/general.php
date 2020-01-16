<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in src/config/GeneralConfig.php
 */

return [

    // All environments
    '*' => [
         'useProjectConfigFile' => true,

        // Craft defined config settings
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],
        'enableCsrfProtection' => true,
        'generateTransformsBeforePageLoad' => true,
        'omitScriptNameInUrls' => true,
        'securityKey' => getenv('SECURITY_KEY'),
        'maxInvalidLogins' => 1000,
        'maxUploadFileSize' => 10000000,
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'maxSlugIncrement' => 100,

        // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
        'aliases' => [
            // @web should be set intentionally
            '@web' => getenv('DEFAULT_SITE_URL'),
        ],
    ],

    // Production (live) environment
    'production' => [
        // Disable project config changes on production
        'allowAdminChanges' => true,
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'isSystemLive' => true,
        // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
        'aliases' => [
        ],
        // Custom site-specific config settings
        'custom' => [
        ]
    ],

    // Staging (pre-production) environment
    'staging' => [
        // Disable project config changes on staging
        'allowAdminChanges' => true,
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => true,
        'enableTemplateCaching' => true,
        'isSystemLive' => false,
        'defaultFileMode' => '0774',
        // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
        'aliases' => [
        ],
        // Custom site-specific config settings
        'custom' => [
        ]
    ],

    // Local (development) environment
    'local' => [
        // Craft defined config settings
        'allowUpdates' => true,
        'backupOnUpdate' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'isSystemLive' => true,
        // Aliases parsed in sites’ settings, volumes’ settings, and Local volumes’ settings
        'aliases' => [
        ],
        // Custom site-specific config settings
        'custom' => [
        ]
    ],
];
