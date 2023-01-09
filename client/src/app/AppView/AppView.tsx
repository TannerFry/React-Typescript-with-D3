import * as React from 'react';
import { observer } from 'mobx-react';
import TheBasics from './Lectures/TheBasics/TheBasics';

import './AppView.scss';

interface IAppViewState{
}

@observer
export default class AppView extends React.Component<{}, IAppViewState> {
    readonly state: IAppViewState = { };

    render() {
        return (
            <div>
                <TheBasics />
            </div>
        );
    }
}
