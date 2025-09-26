import { useRef, useState, useEffect, useMemo } from 'react'
import { getDataTransactionsByYear } from '../services/transactionService'
import { getDataDetailByTransaction } from '../services/detailService'
import Swal from "sweetalert2"
import moment from 'moment'

export default function useTransactionDetailData(filters, categories) {
    const prevYearRef = useRef(filters.year);

    const [isLoading, setIsLoading] = useState(true);
    const [transactionsPerYear, setTransactionsPerYear] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [details, setDetails] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState([]);

    const summarizeTransactionsPerYear = () => {
        const dataSummary = {};

        transactionsPerYear.forEach((transaction) => {
            const month = moment(transaction.date).format('M');

            if (!dataSummary[month]) {
                dataSummary[month] = {
                    id: parseInt(month),
                    month: moment(transaction.date).format('MMMM'),
                    month_start_format: moment(transaction.date).startOf('month').format('YYYY-MM-DDTHH:mm:ss') + '.000Z',
                    balance: 0,
                    income: 0,
                    expense: 0,
                    total: 0,
                };
            }

            const monthSummary = dataSummary[month];

            switch (transaction.type) {
                case 'balance':
                    monthSummary.balance = transaction.value;
                    break;
                case 'add':
                    monthSummary.income += transaction.value;
                    monthSummary.total += transaction.value;
                    break;
                case 'minus':
                    monthSummary.expense += transaction.value;
                    monthSummary.total -= transaction.value;
                    break;
                default:
                    throw new Error(`Unknown transaction type: ${transaction.type}`);
            }
        });

        return Object.values(dataSummary);
    };

    const summarizeDetailsPerMonthPerCategory = (type) => {
        const detailsData = transactionDetails.flatMap(transaction => transaction.details);
        const dataSummary = detailsData.reduce((acc, detail) => {
            const { category_id, category, category_icon, value } = detail;

            if (type === detail.type_trans) {
                if (!acc[category_id]) {
                    acc[category_id] = {
                        category_id,
                        category,
                        category_icon,
                        total_value: 0,
                        items: []
                    };
                }

                acc[category_id].total_value += value;
                acc[category_id].items.push(detail);
            }

            return acc;
        }, {});

        return Object.values(dataSummary);
    };

    const dataTableViewFinancialSummary = useMemo(() => {
        return summarizeTransactionsPerYear();
    }, [transactionsPerYear]);

    const dataChartAreaSplineSummaryTransactionPerYear = useMemo(() => {
        const summary = summarizeTransactionsPerYear();

        const result = summary.reduce((acc, item) => {
            acc.month_start_format.push(item.month_start_format);
            acc.income.push(item.income);
            acc.expense.push(item.expense);
            acc.balance.push(item.balance);
            return acc;
        }, { month_start_format: [], income: [], expense: [], balance: [] });

        return {
            colors: ['#0D6EFD', '#198754', '#DC3545'],
            categories: result.month_start_format,
            series: [
                { name: 'Saldo', data: result.balance },
                { name: 'Pemasukan', data: result.income },
                { name: 'Pengeluaran', data: result.expense },
            ],
        }
    }, [transactionsPerYear]);

    const dataChartBarLineSummaryTransactionPerYear = useMemo(() => {
        const summary = summarizeTransactionsPerYear();

        const result = summary.reduce((acc, item) => {
            acc.month_start_format.push(item.month_start_format);
            acc.income.push(item.income);
            acc.expense.push(-Math.abs(item.expense));
            acc.total.push(item.total);
            return acc;
        }, { month_start_format: [], income: [], expense: [], total: [] });

        return {
            colors: ['#198754', '#DC3545', '#0D6EFD'],
            categories: result.month_start_format,
            series: [
                { name: 'Pemasukan', type: 'column', data: result.income },
                { name: 'Pengeluaran', type: 'column', data: result.expense },
                { name: 'Total', type: 'line', data: result.total },
            ],
        }
    }, [transactionsPerYear]);

    const transactionDetailsFiltered = useMemo(() => {
        const search = filters.search?.toLowerCase();
        const category = filters.category;

        if (!search && !category) return transactionDetails;

        return transactionDetails.reduce((acc, transaction) => {
            const matchSearchTransaction = search ? transaction.description.toLowerCase().includes(search) : false;

            const matchedDetails = [];

            for (const detail of transaction.details) {
                const matchSearchDetail = search ? detail.description.toLowerCase().includes(search) : true;
                const matchCategory = category ? detail.category_id == category : true;

                if (matchSearchDetail && matchCategory) {
                    matchedDetails.push(detail);
                }
            }

            if (matchSearchTransaction || matchedDetails.length > 0) {
                acc.push({
                    ...transaction,
                    details: matchedDetails
                });
            }

            return acc;
        }, []);
    }, [filters.search, transactionDetails]);

    const dataChartDonutTransactionPerCategory = useMemo(() => {
        const summary = summarizeDetailsPerMonthPerCategory(filters.type);

        const result = summary.reduce((acc, item) => {
            acc.category_name.push(item.category);
            acc.category_total.push(item.total_value);
            return acc;
        }, { category_name: [], category_total: [] });

        return {
            labels: result.category_name,
            series: result.category_total,
        }
    }, [filters.type, transactionDetails]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);

            try {
                let yearData = transactionsPerYear;

                // cek kalau year berubah atau data tahun belum ada
                if (transactionsPerYear.length === 0 || prevYearRef.current !== filters.year) {
                    yearData = await getDataTransactionsByYear(filters.year);
                    setTransactionsPerYear(yearData);

                    // update prevYearRef
                    prevYearRef.current = filters.year;
                }

                // filter per bulan
                const monthData = yearData.filter((item) => parseInt(moment(item.date).format('M')) === parseInt(filters.month));
                setTransactions(monthData);

                // fetch detail berdasarkan transaksi bulan tsb
                const ids = monthData.map((t) => t.id);
                const detailData = ids.length ? await getDataDetailByTransaction(ids) : [];
                setDetails(detailData);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [filters.year, filters.month]);

    useEffect(() => {
        const categoriesMap = new Map(categories.map(category => [category.id, category]));
        const detailsByTransId = details.reduce((map, detail) => {
            if (!map.has(detail.trans_id)) {
                map.set(detail.trans_id, []);
            }
            map.get(detail.trans_id).push(detail);
            return map;
        }, new Map());

        const transactionDetailsJoin = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'balance') return acc;

            const relatedDetails = detailsByTransId.get(transaction.id) || [];
            const enrichedDetails = relatedDetails.map(detail => {
                const category = categoriesMap.get(detail.category_id);
                return {
                    ...detail,
                    category: category?.name ?? null,
                    category_icon: category?.icon ?? null,
                    type_trans: detail.value < 0 ? 'add' : transaction.type,
                    value: Math.abs(detail.value)
                };
            });

            acc.push({
                ...transaction,
                details: enrichedDetails
            });

            return acc;
        }, []);

        setTransactionDetails(transactionDetailsJoin);
    }, [details]);

    useEffect(() => {
        if (isLoading) {
            Swal.fire({
                title: 'Loading Data',
                html: 'Mohon tunggu sebentar...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        } else {
            Swal.close();
        }
    }, [isLoading]);

    return { transactionDetailsFiltered, dataTableViewFinancialSummary, dataChartAreaSplineSummaryTransactionPerYear, dataChartBarLineSummaryTransactionPerYear, dataChartDonutTransactionPerCategory };
}