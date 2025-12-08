import { memo } from 'react'
import Chart from 'react-apexcharts'

const ChartAreaSpline = memo(({ data, type }) => {
    const categories = data.categories;
    const colors = data.colors;
    const series = data.series;

    const options = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        colors: colors,
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        tooltip: {
            x: {
                show: true,
                format: type === 'day' ? 'dddd, dd MMM yyyy' : 'MMM yyyy',
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
            labels: { format: type === 'day' ? 'd' : 'MMM' },
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
        dataLabels: { enabled: false },
    };

    return (
        <Chart options={options} series={series} type="area" height={280} />
    );
});

export default ChartAreaSpline;
