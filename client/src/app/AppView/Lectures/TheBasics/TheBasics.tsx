import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as d3 from 'd3';

import './TheBasics.scss';

@observer
export default class TheBasics extends React.Component<{}, {}> {
    @observable svgRef = React.createRef<SVGSVGElement>();
    @observable fakeData: number[] = [25, 30, 45, 60, 20]

    componentDidMount() {
        this.updateSVG();
    }

    updateSVG = () => {
        // Step 1 - Create selection to the SVG element
        const svg = d3.select(this.svgRef.current);

        svg
            // Step 2 - Select all existing circle divs
            .selectAll('circle')
            // Step 3 - Load our fake data
            .data(this.fakeData)
            // Step 4 - Perform join statement
            .join('circle')
            .attr('r', (value) => value) // setting attribute based on value
            .attr('cx', (value) => value * 2) // setting attribute based on value
            .attr('cy', (value) => value * 2) // setting attribute based on value
            .attr('stroke', 'red');
    }

    updateFakeData = () => {
        // Increment all fake data values by 1
        this.fakeData = this.fakeData.map((value) => value + 1);
        // Update SVG
        this.updateSVG();
    }

    filterFakeData = () => {
        // Filter data that is greater than 35
        this.fakeData = this.fakeData.filter((value) => value > 35);
        // Update SVG
        this.updateSVG();
    }

    render() {
        return (
            <>
                <svg ref={this.svgRef} style={{ border: '1px solid black' }} />

                <br />

                <button type="button" onClick={this.updateFakeData}>
                    Update Fake Data
                </button>

                <button type="button" onClick={this.filterFakeData}>
                    Filter Fake Data
                </button>
            </>
        );
    }
}
