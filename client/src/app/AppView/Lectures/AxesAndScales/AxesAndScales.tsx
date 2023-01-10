import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as d3 from 'd3';

import './AxesAndScales.scss';

@observer
export default class AxesAndScales extends React.Component<{}, {}> {
    @observable svgRef = React.createRef<SVGSVGElement>();
    @observable fakeData: number[] = [25, 30, 45, 60, 20]

    componentDidMount() {
        this.updateSVG();
    }

    updateSVG = () => {
        // Step 1 - Select SVG element
        const svg = d3.select(this.svgRef.current);
        // Step 2 - Create d3.line() mapper
        const line = d3.line<number>()
            .x((value, index) => index * 50)
            .y((value, index) => value)
            .curve(d3.curveCardinal);
        svg
            // Step 3 - Select all existing path elements
            .selectAll('path')
            // Step 4 - Bind fake data
            .data([this.fakeData])
            .join('path')
            // Step 5 - Add d attribute
            .attr('d', (value) => line(value))
            // Step 6 - Add styling
            .attr('fill', 'none')
            .attr('stroke', 'blue');
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
