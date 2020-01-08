@servers(['web' => ['europa.staging']])

@setup
    $workingDir = '/home/craftcms/europa';

    if (!$branch) {
        $branch = 'master';
    }
@endsetup

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

@task('build')
    cd {{ $workingDir }}
    yarn run production
@endtask

@task('composer')
    cd {{ $workingDir }}
    composer install --no-progress
@endtask

@task('composer_nuke')
    cd {{ $workingDir }}
    rm -Rf vendor
    composer clearcache
    composer install --no-progress
@endtask

{{-- Example: envoy run craft --cmd="clear-caches/all" --}}
@task('craft')
    cd {{ $workingDir }}
    ./craft {{ $cmd }}
@endtask

@task('yarn')
    cd {{ $workingDir }}
    yarn install
@endtask

@task('yarn_nuke')
    cd {{ $workingDir }}
    rm -rf node_modules
    yarn install
@endtask
