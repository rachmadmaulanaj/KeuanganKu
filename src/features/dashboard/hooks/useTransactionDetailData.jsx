import { useState, useEffect, useMemo } from 'react'
import { getDataTransactionsByPeriod } from '../services/transactionService'
import { getDataDetailByTransaction, getDataLatestActivity } from '../services/detailService'
import Swal from "sweetalert2"
import moment from 'moment'

export default function useTransactionDetailData(filters, categories) {
    const [transactions, setTransactions] = useState([]);
    const [details, setDetails] = useState([]);
    const [dataCurrentBalance, setDataCurrentBalance] = useState([]);
    const [dataLatestActivity, setDataLatestActivity] = useState([]);

    const dataInfoFinance = useMemo(() => {
        const dataInfoFinanceResult = details.reduce((acc, detail) => {
            const value = Math.abs(detail.value);
            if (detail.type === 'balance') {
                acc.balance.total += 1;
                acc.balance.value += value;
            }
            if (detail.type === 'add') {
                acc.income.total += 1;
                acc.income.value += value;
            }
            if (detail.type === 'minus') {
                acc.expense.total += 1;
                acc.expense.value += value;
            }
            return acc;
        }, {
            balance: { total: 0, value: 0 },
            income: { total: 0, value: 0 },
            expense: { total: 0, value: 0 },
        });

        return dataInfoFinanceResult;
    }, [details]);

    const dataChartPerMonth = useMemo(() => {
        const dataChartIncomes = [];
        const dataChartExpenses = [];
        const dataChartDaysNumber = [];
        const dataSelectByType = filters.type === 'transaction' ? transactions : details;
        const currentDate = moment();
        let currentDayNumber = currentDate.format('DD');
        if (filters.month !== parseInt(currentDate.format('M')) || filters.year !== parseInt(currentDate.format('YYYY'))) {
            currentDayNumber = moment(`${filters.year}-${filters.month}`, "YYYY-MM").endOf('month').date();
        }

        for (let i = 1; i <= parseInt(currentDayNumber); i++) {
            const transFilterDayIncome = dataSelectByType.reduce((total, item) => {
                let value = 0;
                const dayNumber = parseInt(moment(item.date).format('DD'));
                if (item.type === 'add' && dayNumber === i) value = Math.abs(item.value);
                return total + value;
            }, 0);
            const transFilterDayExpense = dataSelectByType.reduce((total, item) => {
                let value = 0;
                const dayNumber = parseInt(moment(item.date).format('DD'));
                if (item.type === 'minus' && dayNumber === i) value = Math.abs(item.value);
                return total + value;
            }, 0);
            const date = moment(filters.year + '-' + filters.month + '-' + i, 'YYYY-M-D').format('YYYY-MM-DDTHH:mm:ss') + 'Z';

            dataChartIncomes.push(transFilterDayIncome);
            dataChartExpenses.push(transFilterDayExpense);
            dataChartDaysNumber.push(date);
        }

        return {
            categories: dataChartDaysNumber,
            series: [
                { name: 'Pemasukan', data: dataChartIncomes },
                { name: 'Pengeluaran', data: dataChartExpenses }
            ],
            colors: ['#198754', '#DC3545']
        }
    }, [details, filters.type]);

    const dataChartTopCategory = useMemo(() => {
        if (!categories.length || !details.length) {
            return {
                series: [{ data: [] }],
                colors: ['#dc3545', '#fd7e14', '#ffc107', '#198754', '#0d6efd'],
                categories: [],
                totals: [],
            };
        }

        const totalPerCategory = details.reduce((acc, detail) => {
            if (detail.type !== "minus") return acc;
            if (!acc[detail.category_id]) {
                acc[detail.category_id] = 0;
            }

            acc[detail.category_id] += detail.value;
            return acc;
        }, {});

        const totalPerCategoryFormat = Object.entries(totalPerCategory).map(([category_id, total]) => ({
            category_id: Number(category_id),
            total
        }));

        const grandTotal = totalPerCategoryFormat.reduce((sum, item) => sum + item.total, 0);

        const resultWithPercentage = totalPerCategoryFormat.map(item => {
            const percent = (item.total / grandTotal) * 100;
            const category = categories.find(category => category.id === item.category_id);
            return {
                category_id: category.id,
                category_name: category.name,
                total: item.total,
                percentage: Number(percent.toFixed(2))
            };
        });
        const resultWithPercentageSorted = resultWithPercentage.sort((a, b) => b.percentage - a.percentage).slice(0, 5);

        const result = {
            series: [{ data: resultWithPercentageSorted.map(item => item.percentage) }],
            colors: ['#dc3545', '#fd7e14', '#ffc107', '#198754', '#0d6efd'],
            categories: resultWithPercentageSorted.map(item => item.category_name),
            totals: resultWithPercentageSorted.map(item => item.total),
        }

        return result;
    }, [details]);

    useEffect(() => {
        Swal.fire({
            title: 'Memuat data...',
            text: 'Silakan tunggu',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const loadDataTransaction = async () => {
            try {
                const month = filters.month ? filters.month : moment().month() + 1;
                const year = filters.year ? filters.year : moment().year();
                const transactionsData = await getDataTransactionsByPeriod(month, year);
                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        loadDataTransaction();
    }, [filters.month, filters.year]);

    useEffect(() => {
        if (!transactions.length) return;

        const loadDataDetails = async () => {
            try {
                const transactionsIDArr = transactions.map(transaction => transaction.id);
                const detailsData = transactionsIDArr.length ? await getDataDetailByTransaction(transactionsIDArr) : [];
                const transactionsMap = new Map(transactions.map(p => [p.id, p]));
                const detailsDataMapped = detailsData.map(detail => {
                    const transaction = transactionsMap.get(detail.trans_id);
                    return {
                        ...detail,
                        type: detail.value < 0 ? 'add' : transaction.type
                    }
                });
                setDetails(detailsDataMapped);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        loadDataDetails();
    }, [transactions]);

    useEffect(() => {
        Swal.close();
    }, [details]);

    useEffect(() => {
        const loadDataCurrentBalance = async () => {
            const currentMonth = moment().month() + 1;
            const currentYear = moment().year();
            try {
                const currentBalanceData = await getDataTransactionsByPeriod(currentMonth, currentYear);
                const { balance, totalAdd, totalMinus } = currentBalanceData.reduce((acc, item) => {
                    if (item.type === "balance") acc.balance += item.value;
                    if (item.type === "add") acc.totalAdd += item.value;
                    if (item.type === "minus") acc.totalMinus += item.value;
                    return acc;
                }, { balance: 0, totalAdd: 0, totalMinus: 0 });

                const currentBalanceDataTotal = balance + totalAdd - totalMinus;
                setDataCurrentBalance(currentBalanceDataTotal);
            } catch (error) {
                console.error('Error fetching current balance:', error);
            }
        };

        const loadDataLatestActivity = async () => {
            try {
                const latestActivityData = await getDataLatestActivity();
                const latestActivityDataMapped = latestActivityData.map(item => ({
                    ...item,
                    category: item.categories?.name,
                    category_icon: item.categories?.icon,
                    type_trans: item.transactions?.type,
                }));
                setDataLatestActivity(latestActivityDataMapped);
            } catch (error) {
                console.error('Error fetching latest activity:', error);
            }
        };

        loadDataCurrentBalance();
        loadDataLatestActivity();
    }, []);

    return { dataInfoFinance, dataLatestActivity, dataChartPerMonth, dataCurrentBalance, dataChartTopCategory };
}