import Chart from "react-apexcharts";

const ChartBar = ({ data }) => {
    const series = [
        { name: 'Pemasukkan', data: [data.income.total] },
        { name: 'Pengeluaran', data: [data.expense.total] },
    ];
    const options = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        colors: ["#198754", "#DC3545"],
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'center',
                    orientation: 'horizontal',
                },
                horizontal: true,
                borderRadius: 10,
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                colors: ["#FFFFFF"]
            }
        },
        grid: { show: false },
        fill: { opacity: 1 },
        stroke: {
            show: true,
            width: 5,
            colors: ['transparent']
        },
        legend: { show: true },
        yaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false }
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false }
        },
    };

    return (
        <Chart options={options} series={series} type="bar" height={150} width={"100%"} />
    );
};

export default ChartBar;