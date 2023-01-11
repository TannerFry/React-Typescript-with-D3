import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as d3 from 'd3';

import './AxesAndScales.scss';

@observer
export default class AxesAndScales extends React.Component<{}, {}> {
    @observable svgRef = React.createRef<SVGSVGElement>();
    @observable fakeData: number[] = [25, 30, 45, 60, 20, 40, 70]

    componentDidMount() {
        this.updateSVG();
    }

    updateSVG = () => {
        const svg = d3.select(this.svgRef.current);

        // Create x-axis scaler
        const xScale = d3
            .scaleLinear()
            .domain([0, this.fakeData.length - 1])
            .range([0, 300]);

        // Create x-axis
        const xAxis = d3.axisBottom(xScale);

        svg.append('g')
            .attr('class', 'xAxis')
            .attr('transform', 'translate(0, 150)')
            .call(xAxis);

        const line = d3.line<number>()
            .x((value, index) => xScale(index))
            .y((value) => value)
            .curve(d3.curveCardinal);
        svg
            .selectAll('.line')
            .data([this.fakeData])
            .join('path')
            .attr('class', 'line')
            .attr('d', (value) => line(value))
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
                <svg ref={this.svgRef} style={{ border: '1px solid black', overflow: 'visible' }} />

                <br />
                <br />
                <br />
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
