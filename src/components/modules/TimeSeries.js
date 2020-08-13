class TimeSeries extends Component {
    constructor(props) {
        super(props)
        this.drawChart = this.drawChart.bind(this)
    }
    componentDidMount() {
        this.drawChart()
    }
    componentDidUpdate() {
        this.drawChart()
    }
    drawChart() {
        //Set node
        const node = this.node

        const data = this.props.data

        var margin = { top: 10, right: 30, bottom: 30, left: 60 }
        var w = this.props.size[0] - margin.left - margin.right
        var h = this.props.size[1] - margin.top - margin.bottom
        var y_at = this.props.yAxisAttribute

        //Extract max
        var dataMax = max(data, function (d) { return d[y_at]; })
        var dataMin = min(data, function (d) { return d[y_at]; })

        //Set ranges
        const xScale = scaleLinear()
            .domain([0, data.length])
            .range([0, w])
        const yScale = scaleLinear()
            .domain([dataMin, dataMax])
            .range([h, 0])

        //Clear after each selection
        select(node)
            .selectAll('path')
            .data(this.props.data)
            .enter()
            .append('path')

        select(node)
            .selectAll('path')
            .data(this.props.data)
            .exit()
            .remove()

        select(node)
            .selectAll('g')
            .data(this.props.data)
            .enter()
            .append('g')

        select(node)
            .selectAll('g')
            .data(this.props.data)
            .exit()
            .remove()

        //Add Axis
        select(node)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + h + ")")
            .call(axisBottom(xScale));
        select(node)
            .append("g")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(axisLeft(yScale));

        //Define Lines

        //Set line
        select(node)
            .append('path')
            .datum(data)
            .attr("transform", "translate(" + margin.left + ",0)")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x(function (d, i) { return xScale(i) })
                .y(function (d) { return yScale(d[y_at]) })
            )

    }

    render() {
        return <svg ref={node => this.node = node}
            width={450} height={500}>
        </svg>
    }
}