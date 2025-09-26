import React from "react"
import Chart from "react-apexcharts"
import { convertRupiahFormat } from "../utils/global"

const ChartColumn = React.memo(({ data }) => {
    const series = data.series;
    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        colors: data.colors,
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
                distributed: true,
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: data.categories,
            labels: { show: false }
        },
        yaxis: {
            labels: {
                formatter: function (value, index) {
                    return value.toFixed(0) + '%';
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (value, index) {
                    return value + '% (' + convertRupiahFormat(data.totals[index.dataPointIndex]) + ')';
                },
                title: { formatter: () => '' },
            },
        },
        legend: {
            show: true,
            itemMargin: { horizontal: 3 }
        },
    };

    return (
        <Chart options={options} series={series} type="bar" height={190} width={"100%"} />
    );
});

export default ChartColumn;