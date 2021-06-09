<?php

namespace modules\demos\console\controllers;

use Craft;
use craft\console\Controller;
use craft\elements\User;
use craft\helpers\Console;
use yii\console\ExitCode;

class SeedController extends Controller
{

    /**
     * @var string
     */
    public $username;

    /**
     * @var string
     */
    public $password;

    /**
     * @var string
     */
    public $dumpfile;

    public function options($actionID): array
    {
        $options = parent::options($actionID);

        $options[] = 'username';
        $options[] = 'password';
        $options[] = 'dumpfile';

        return $options;
    }

    public function actionIndex(): int
    {
        // $this->runAction('restore-db', ['europa-museum-3.6.15.sql']);
        // $this->runAction('create-user');
        // $this->runAction('load-fake-data');


        return ExitCode::OK;
    }

    public function actionCreateUser(): int
    {
        $this->stdout('Saving the user ... ');

        $user = new User([
            'username' => $this->username,
            'password' => $this->password,
            'email' => 'faker',
        ]);

        if (!Craft::$app->getElements()->saveElement($user)) {
            $this->stderr('failed:' . PHP_EOL . '    - ' . implode(PHP_EOL . '    - ', $user->getErrorSummary(true)) . PHP_EOL, Console::FG_RED);

            return ExitCode::USAGE;
        }

        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        return ExitCode::OK;
    }

    public function actionRestoreDb(string $path): int
    {
        $this->stdout('Restoring database backup ... ');

        try {
            Craft::$app->getDb()->restore($path);
        } catch (\Throwable $e) {
            Craft::$app->getErrorHandler()->logException($e);
            $this->stderr('error: ' . $e->getMessage() . PHP_EOL, Console::FG_RED);

            return ExitCode::UNSPECIFIED_ERROR;
        }

        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        return ExitCode::OK;
    }

    public function loadFakeData(): int
    {
        return ExitCode::OK;
    }
}
