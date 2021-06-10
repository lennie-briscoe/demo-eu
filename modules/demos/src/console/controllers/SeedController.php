<?php

namespace modules\demos\console\controllers;

use Craft;
use craft\console\Controller;
use craft\elements\User;
use craft\helpers\Console;
use Faker\Generator as FakerGenerator;
use Solspace\Freeform\Elements\Submission;
use Solspace\Freeform\Freeform;
use Solspace\Freeform\Library\Composer\Components\Form;
use Solspace\Freeform\Services\SubmissionsService;
use yii\console\ExitCode;

class SeedController extends Controller
{
    /**
     * @var string|null
     */
    public ?string $email = null;

    /**
     * @var string|null
     */
    public string $username = 'admin';

    /**
     * @var string|null
     */
    public ?string $password = null;

    /**
     * @var string
     */
    public ?string $dumpfile = null;

    /**
     * @var FakerGenerator
     */
    private FakerGenerator $_faker;

    public function init(): void
    {
        parent::init();

        $this->_faker = \Faker\Factory::create();
    }

    public function options($actionID): array
    {
        $options = parent::options($actionID);

        $options[] = 'email';
        $options[] = 'username';
        $options[] = 'password';
        $options[] = 'dumpfile';

        return $options;
    }

    public function actionIndex(): int
    {
        if ($this->dumpfile) {
            $this->runAction('restore-db', [$this->dumpfile]);
        }

        $this->runAction('create-user');
        $this->runAction('seed-freeform-data');

        return ExitCode::OK;
    }

    public function actionCreateUser(): int
    {
        $this->stdout('Creating the user ... ');

        $user = new User([
            'username' => $this->username,
            'newPassword' => $this->password,
            'email' => $this->email,
            'admin' => true,
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

    public function actionSeedFreeformData(): int
    {
        $this->stdout('Seeding Freeform Data ... ');

        // $freeform = Freeform::getInstance();
        // $form = $freeform->forms->getFormByHandle('contact');
        //
        // // $form = new Form();
        // $submission = $freeform->submissions->createSubmissionFromForm($form);
        // // $submission = Submission::create();
        // // $submission->formId = $form->id;
        //
        //
        // $submission->setFormFieldValues([
        //     'email' => $this->_faker->email,
        //     'firstName' => $this->_faker->firstName,
        //     'lastName' => $this->_faker->lastName,
        //     'message' => $this->_faker->text
        // ]);
        //
        // for ($i = 0; $i < 10; $i++) {
        //     if (!Craft::$app->getElements()->saveElement($submission)) {
        //         $this->stderr('failed:' . PHP_EOL . '    - ' . implode(PHP_EOL . '    - ', $submission->getErrorSummary(true)) . PHP_EOL, Console::FG_RED);
        //
        //         return ExitCode::USAGE;
        //     }
        // }

        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        return ExitCode::OK;
    }
}
