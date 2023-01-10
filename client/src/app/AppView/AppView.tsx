import * as React from 'react';
import { observer } from 'mobx-react';

import './AppView.scss';
import AxesAndScales from './Lectures/AxesAndScales/AxesAndScales';

interface IAppViewState{
}

@observer
export default class AppView extends React.Component<{}, IAppViewState> {
    readonly state: IAppViewState = { };

    render() {
        return (
            <div>
                <AxesAndScales />
            </div>
        );
    }
}
