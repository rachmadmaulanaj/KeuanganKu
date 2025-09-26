import React from "react"
import Chart from "react-apexcharts"

const ChartBarLine = React.memo(({ data }) => {
    const categories = data.categories;
    const colors = data.colors;
    const series = data.series;

    const options = {
        chart: {
            type: "bar",
            stacked: true,
            height: 350,
            toolbar: { show: false }
        },
        stroke: {
            width: [0, 0, 3],
            curve: 'smooth'
        },
        colors: colors,
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            },
        },
        tooltip: {
            x: {
                show: true,
                format: 'MMM yyyy',
            },
            y: {
                formatter: function (value) {
                    const formatter = new Intl.NumberFormat('id-ID');
                    return 'Rp. ' + formatter.format(value);
                },
                title: {
                    formatter: (seriesName) => seriesName + ':',
                },
            }
        },
        xaxis: {
            type: 'datetime',
            categories: categories,
            labels: { format: 'MMM' },
            tooltip: { enabled: false }
        },
        yaxis: {
            labels: {
                formatter: function (value, index) {
                    const formatter = new Intl.NumberFormat('id-ID');
                    var screenWidth = window.innerWidth;
                    if (screenWidth > 640) {
                        return 'Rp. ' + formatter.format(value);
                    } else {
                        if (value >= 1000000000) {
                            return `${formatter.format(Math.floor(value / 1000000000))}M`;
                        } else if (value >= 1000000) {
                            return `${formatter.format(Math.floor(value / 1000000))}jt`;
                        } else if (value >= 1000) {
                            return `${formatter.format(Math.floor(value / 1000))}rb`;
                        } else {
                            return formatter.format(value);
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [2],
            formatter: function (value) {
                const formatter = new Intl.NumberFormat('id-ID');
                return 'Rp. ' + formatter.format(value);
            },
        },
    };

    return (
        <Chart options={options} series={series} type="line" height={350} />
    );
});

export default ChartBarLine;