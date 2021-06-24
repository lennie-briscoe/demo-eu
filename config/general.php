<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in src/config/GeneralConfig.php
 */

use craft\helpers\App;

return [

    // All environments
    '*' => [
        'allowAdminChanges' => false,
        'defaultSearchTermOptions' => [
            'subLeft' => true,
            'subRight' => true,
        ],
        'enableCsrfProtection' => true,
        'useEmailAsUsername' => true,
        'generateTransformsBeforePageLoad' => true,
        'omitScriptNameInUrls' => true,
        'securityKey' => App::env('SECURITY_KEY'),
        'maxInvalidLogins' => 1000,
        'maxUploadFileSize' => 20000000,
        'resourceBasePath' => dirname(__DIR__) . '/web/cpresources',
        'maxSlugIncrement' => 100,
        'aliases' => [
            // @web should be set intentionally
            '@web' => App::env('DEFAULT_SITE_URL'),
        ],
    ],

    // Production (live) environment
    'production' => [
        'allowAdminChanges' => false,
    ],

    // Staging (pre-production) environment
    'staging' => [
    ],

    // Local (development) environment
    'local' => [
        'allowAdminChanges' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
    ],
];
