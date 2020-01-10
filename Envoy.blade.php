{{--
    Be sure to set up `Host europa.stage` in your local `~/.ssh/config`
    to point to the DO dropet IP with the correct user. (Ask for that info.)
--}}
@servers(['web' => ['europa.stage']])

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

{{--
    Usage:
        envoy run deploy
        envoy run deploy --branch=[branch other than master]
    
    Will `git pull master` on the server unless you provide an
    alternate branch. If so, it will switch branches an pull.
    If you want it to be on the `dev` branch, use the `--branch=dev`
    every time you deploy dev.
--}}
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

{{-- Yarn tasks - DON'T USE, compile locally --}}

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
