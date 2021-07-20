<?php

namespace modules\demos\console\controllers;

use Composer\Util\Platform;
use Craft;
use craft\console\Controller;
use craft\elements\Entry;
use craft\elements\User;
use craft\helpers\App;
use craft\helpers\Console;
use craft\helpers\Db;
use craft\helpers\FileHelper;
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
     * Seeds all data necessary for a working demo
     *
     * @return int
     */
    public function actionIndex(): int
    {
        $this->stdout('Beginning seed ... ' . PHP_EOL);
        $this->runAction('freeform-data', ['contact']);
        $this->runAction('refresh-news');

        $this->_cleanup();

        $this->stdout(PHP_EOL);

        if ($this->interactive) {
            $this->stdout("Creating admin user ..." . PHP_EOL);
            Craft::$app->runAction('users/create', ['admin' => true]);
            $this->stdout('Done creating admin user.' . PHP_EOL . PHP_EOL, Console::FG_GREEN);
        } else {
            $this->stdout('Run the following command to create an admin user:' . PHP_EOL, Console::FG_YELLOW);
            $this->_outputCommand('users/create --admin');
        }

        $this->stdout('Seed complete.' . PHP_EOL, Console::FG_GREEN);
        return ExitCode::OK;
    }

    private function _cleanup()
    {
        $this->stdout('Setting system status to online ... ');
        Craft::$app->projectConfig->set('system.live', true, null, false);
        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        $this->stdout('Running queue ... ' . PHP_EOL);
        Craft::$app->queue->run();
        $this->stdout('Queue finished.' . PHP_EOL, Console::FG_GREEN);

        $this->stdout('Clearing data cache ... ');
        Craft::$app->getCache()->flush();
        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        $compiledClassesPath = Craft::$app->getPath()->getCompiledClassesPath();

        $this->stdout('Clearing compiled classes ... ');
        FileHelper::removeDirectory($compiledClassesPath);
        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);
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

    public function actionRefreshNews(): int
    {
        $this->stdout("Refreshing news ... ");
        $entries = Entry::find()->section('newsArticles');

        foreach ($entries->all() as $entry) {
            $entry->postDate = $this->_faker->dateTimeInInterval('now', '-2 weeks');
            Craft::$app->elements->saveElement($entry);
        }

        $this->stdout('done' . PHP_EOL, Console::FG_GREEN);

        return ExitCode::OK;
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

    /**
     * Outputs a terminal command.
     *
     * @param string $command
     */
    private function _outputCommand(string $command)
    {
        $script = FileHelper::normalizePath($this->request->getScriptFile());
        if (!Platform::isWindows() && ($home = App::env('HOME')) !== false) {
            $home = FileHelper::normalizePath($home);
            if (strpos($script, $home . DIRECTORY_SEPARATOR) === 0) {
                $script = '~' . substr($script, strlen($home));
            }
        }
        $this->stdout(PHP_EOL . '    php ' . $script . ' ' . $command . PHP_EOL . PHP_EOL);
    }
}
