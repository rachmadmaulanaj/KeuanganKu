import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = (props) => {
    const convertRupiahFormat = (value) => {
        const string_value = value.toString();
        const formatted_value = string_value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `Rp. ${formatted_value},-`;
    }

    let dateFormatArr = [];
    let labels = [];
    let dataIncome = [];
    let dataSpending = [];

    props.data.forEach(val => {
        const date_obj = new Date(val.date.seconds * 1000);
        const date = date_obj.getDate();

        if (!labels.includes(date)) {
            labels.push(date);
            dateFormatArr.push({ date: date, date_format: val.date_v });
        }
        if (!dataIncome[date]) dataIncome[date] = 0;
        if (!dataSpending[date]) dataSpending[date] = 0;
        if (val.type === 'add') { dataIncome[date] += val.value; }
        if (val.type === 'minus') { dataSpending[date] += val.value; }
    });

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: `Periode : ${props.period.label}`,
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        const date = context[0].label;
                        const date_arr = dateFormatArr.find(obj => obj.date == date);
                        return date_arr.date_format.slice(0, -6);
                    },
                    label: (context) => {
                        const label = context.dataset.label;
                        const value = convertRupiahFormat(context.raw);
                        return `${label} : ${value}`;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        const formatter = new Intl.NumberFormat('id-ID');
                        var screenWidth = window.innerWidth;
                        if (screenWidth > 640) {
                            return formatter.format(value);
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
            }
        }
    };

    const data = {
        labels: labels.sort((a, b) => a - b),
        datasets: [
            {
                label: 'Pemasukkan',
                data: Object.values(dataIncome),
                borderColor: '#22c55e', //500
                backgroundColor: '#86efac', //300
                tension: 0.2
            },
            {
                label: 'Pengeluaran',
                data: Object.values(dataSpending),
                borderColor: '#ef4444', //500
                backgroundColor: '#fca5a5', //300
                tension: 0.2
            },
        ],
    };

    return <Line options={options} data={data} />;
}

export default Chart;