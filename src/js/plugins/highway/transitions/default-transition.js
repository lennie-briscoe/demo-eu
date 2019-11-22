import Highway from '@dogstudio/highway/build/highway';

import store from '../../../store';

class DefaultTransition extends Highway.Transition {

    in({from, to, trigger, done}) {

        console.log('in', to);

        setTimeout(() => {
            console.log('in done');
            done();
        }, 500);

    }

    out({from, trigger, done}) {

        console.log('out', from);

        setTimeout(() => {
            console.log('out done');
            from.remove();
            done();
        }, 500);

    }

}

export default DefaultTransition;
