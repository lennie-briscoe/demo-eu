<?php

namespace modules\demos\console\controllers;

use Craft;
use craft\console\Controller;
use craft\elements\User;
use craft\helpers\Console;
use craft\helpers\Db;
use Faker\Generator as FakerGenerator;
use Solspace\Freeform\Elements\Submission;
use Solspace\Freeform\Freeform;
use Solspace\Freeform\Library\Composer\Components\Form;
use yii\console\ExitCode;

class SeedController extends Controller
{
    public const FREEFORM_SUBMISSION_MIN = 100;
    public const FREEFORM_SUBMISSION_MAX = 200;
    public const FREEFORM_MESSAGE_CHARS_MIN = 120;
    public const FREEFORM_MESSAGE_CHARS_MAX = 300;

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
     * @var string|null
     */
    public ?string $dumpfile = null;

    /**
     * @var FakerGenerator
     */
    private FakerGenerator $_faker;

    /**
     * {@inheritdoc}
     */
    public function init(): void
    {
        parent::init();

        $this->_faker = \Faker\Factory::create();
    }

    /**
     * {@inheritdoc}
     */
    public function options($actionID): array
    {
        $options = parent::options($actionID);

        switch ($actionID) {
            case 'index':
                $options[] = 'dumpfile';
                $options[] = 'email';
                $options[] = 'username';
                $options[] = 'password';
            case 'admin-user':
                $options[] = 'email';
                $options[] = 'username';
                $options[] = 'password';
                break;
        }

        return $options;
    }

    /**
     * Seeds all data necessary for a working demo
     *
     * @return int
     */
    public function actionIndex(): int
    {
        if ($this->dumpfile) {
            if ($this->runAction('restore-db', [$this->dumpfile])) {
                return ExitCode::UNSPECIFIED_ERROR;
            }
        }

        if ($this->runAction('admin-user')) {
            return ExitCode::UNSPECIFIED_ERROR;
        }

        if ($this->runAction('freeform-data', ['contact'])) {
            return ExitCode::UNSPECIFIED_ERROR;
        }
    }

    /**
     * Creates an admin user
     *
     * @return int
     */
    public function actionAdminUser(): int
    {
        $this->stdout('Creating admin user ... ');

        $user = new User([
            'username' => $this->username,
            'newPassword' => $this->password,
            'email' => $this->email,
            'admin' => true,
        ]);

        if (!Craft::$app->getElements()->saveElement($user)) {
            $this->stderr('failed:' . PHP_EOL . '    - ' . implode(PHP_EOL . '    - ', $user->getErrorSummary(true)) . PHP_EOL, Console::FG_RED);

            return ExitCode::UNSPECIFIED_ERROR;
        }

        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        return ExitCode::OK;
    }

    /**
     * Restores an uncompressed database dump
     *
     * @param string $path Path to the uncompressed database dump
     * @return int
     */
    public function actionRestoreDb(string $path): int
    {
        $this->stdout("Restoring database backup ... ");

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

    /**
     * Seeds Freeform with submission data
     *
     * @param string $formHandle Freeform form handle
     * @return int
     */
    public function actionFreeformData(string $formHandle): int
    {
        $this->stdout("Seeding Freeform data ..." . PHP_EOL);

        $freeform = Freeform::getInstance();
        $form = $freeform->forms->getFormByHandle($formHandle)->getForm();
        $submissionCount = $this->_faker->numberBetween(self::FREEFORM_SUBMISSION_MIN, self::FREEFORM_SUBMISSION_MAX);
        $errorCount = 0;

        for ($i = 1; $i <= $submissionCount; $i++) {
            try {
                $submission = $this->_createFormSubmission($form);
                $this->stdout("    - [{$i}/{$submissionCount}] Creating submission {$submission->title} ... ");

                if ($this->_saveFormSubmission($submission)) {
                    $this->stdout('done' . PHP_EOL, Console::FG_GREEN);
                } else {
                    $this->stderr('failed: ' . implode(', ', $submission->getErrorSummary(true)) . PHP_EOL, Console::FG_RED);
                    $errorCount++;
                }
            } catch (\Throwable $e) {
                $this->stderr('error: ' . $e->getMessage() . PHP_EOL, Console::FG_RED);
                $errorCount++;
            }
        }

        $this->stdout('Done seeding Freeform data.' . PHP_EOL . PHP_EOL, Console::FG_GREEN);
        return $errorCount ? ExitCode::UNSPECIFIED_ERROR : ExitCode::OK;
    }

    private function _createFormSubmission(Form $form): Submission
    {
        /** @var Submission $submission */
        $submission = Freeform::getInstance()->submissions->createSubmissionFromForm($form);
        $submission->dateCreated = $submission->dateUpdated = $this->_faker->dateTimeThisMonth();

        // Reparse the title with the fake date
        $submission->title = Craft::$app->view->renderString(
            $form->getSubmissionTitleFormat(),
            $form->getLayout()->getFieldsByHandle() + [
                'dateCreated' => $submission->dateCreated,
                'form' => $form,
            ]
        );

        $submission->setFormFieldValues([
            'email' => $this->_faker->email,
            'firstName' => $this->_faker->firstName,
            'lastName' => $this->_faker->lastName,
            'message' => $this->_faker->realTextBetween(self::FREEFORM_MESSAGE_CHARS_MIN, self::FREEFORM_MESSAGE_CHARS_MAX),
        ]);

        return $submission;
    }

    private function _saveFormSubmission(Submission $submission): bool
    {
        if (!Craft::$app->getElements()->saveElement($submission)) {
            return false;
        }

        // Update submissions table to match date, so element index will sort properly
        $dateCreatedDb = Db::prepareDateForDb($submission->dateCreated);

        Craft::$app->db->createCommand()
            ->update($submission::TABLE, [
                'dateCreated' => $dateCreatedDb,
                'dateUpdated' => $dateCreatedDb,
            ], [
                'id' => $submission->id,
            ])
            ->execute();

        return true;
    }
}
