@servers(['web' => ['europa.staging']])

@setup
    $workingDir = '/home/craftcms/europa';

    if (!$branch) {
        $branch = 'master';
    }

    print_r($argv);
@endsetup

{{-- General command execution --}}

{{--
    Usage: envoy run exec --cmd="[a bash command]"

    Example:
        envoy run exec --cmd="./craft/clear-caches/all"

    Use to run anything not provided in this file.
--}}
@task('exec')
    cd {{ $workingDir }}
    {{ $cmd }}
@endtask

{{-- Deployment --}}

@task('deploy')
    cd {{ $workingDir }}

    br=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
    echo "Current branch: $br"

    if [ $br != '{{ $branch }}' ]
    then
        echo "Switching to branch: {{ $branch }}"
        git checkout {{ $branch }}
    fi

    git reset --hard
    git pull origin {{ $branch }}
@endtask

{{-- Database tasks --}}

{{--
    Usage:
        envoy run backup
--}}
@task('backup')
    cd {{ $workingDir }}
    ./craft backup/db
@endtask

{{--
    Usage:
        envoy run backups
    
    Lists the backup files in `storage/backups`.
--}}
@task('backups')
    cd {{ $workingDir }}
    ls {{ $workingDir }}/storage/backups
    #ls -1 {{ $workingDir }}/storage/backups | tr '\n' '\0' | xargs -0 -n 1 basename
@endtask

{{--
    Usage:
        envoy run restore
        envoy run restore --file="backup-filename.sql"
    
    See a list of backup files with `envoy run backups`.
--}}
@task('restore')
    cd {{ $workingDir }}
    ./craft restore storage/backups/{{ $file ?? '' }}
@endtask

{{-- Composer tasks --}}

{{--
    Usage: envoy run composer_install
--}}
@task('composer_install')
    cd {{ $workingDir }}
    composer install --no-progress
@endtask

{{--
    Usage: envoy run composer_nuke
--}}
@task('composer_nuke')
    cd {{ $workingDir }}
    rm -Rf vendor
    composer clearcache
    composer_install
@endtask

{{-- Yarn tasks --}}

{{--
    Usage: envoy run yarn_install
--}}
@task('yarn_install')
    cd {{ $workingDir }}
    yarn install --no-progress
@endtask

{{--
    Usage: envoy run yarn_nuke
--}}
@task('yarn_nuke')
    cd {{ $workingDir }}
    rm -rf node_modules
    yarn_install
@endtask

{{--
    Usage: envoy run yarn_prod
--}}
@task('yarn_prod')
    cd {{ $workingDir }}
    yarn prod
@endtask
