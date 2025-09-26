import React, { useEffect } from "react"
import Chart from "react-apexcharts";
import { convertRupiahFormat } from "../utils/global";

const ChartDonut = React.memo(({ data }) => {
    const series = data.series;
    const labels = data.labels;
    const options = {
        chart: {
            type: 'donut',
        },
        labels: labels,
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: {
                            show: true,
                            formatter: function (val) {
                                return convertRupiahFormat(val)
                            }
                        },
                        total: {
                            show: true,
                            formatter: function (w) {
                                const total = w.globals.seriesTotals.reduce((total, num) => total + num, 0);
                                return convertRupiahFormat(total);
                            }
                        }
                    },
                }
            },
        },
        dataLabels: { enabled: true },
        legend: {
            show: true,
            position: 'right',
        },
        tooltip: { enabled: false },
        stroke: { show: false },
    };

    useEffect(() => {
        if (series?.length) {
            window.dispatchEvent(new Event("resize"));
        }
    }, [series, labels]);

    return (
        <Chart options={options} series={series} type="donut" width="100%" height={350} />
    );
});

export default ChartDonut;