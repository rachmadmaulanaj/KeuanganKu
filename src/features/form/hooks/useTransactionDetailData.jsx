import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { getDataTransactionsByPeriod } from '../services/transactionService'
import { getDataDetailByTransaction } from '../services/detailService'
import Swal from "sweetalert2"

export default function useTransactionDetailData(filters, categories) {
    const [transactions, setTransactions] = useState([]);
    const [details, setDetails] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState([]);

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
    }, [filters.search, filters.category, transactionDetails]);

    const loadDataTransaction = useCallback(async () => {
        try {
            const transactionsData = await getDataTransactionsByPeriod(filters.month, filters.year);
            setTransactions(transactionsData);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [filters.month, filters.year]);

    useEffect(() => {
        Swal.fire({
            title: 'Memuat data...',
            text: 'Silakan tunggu',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => { Swal.showLoading(); }
        });

        loadDataTransaction();
    }, [filters.month, filters.year]);

    useEffect(() => {
        if (!transactions.length) return;

        const loadDataDetails = async () => {
            try {
                const transactionsIDArr = transactions.map(transaction => transaction.id);
                const detailsData = transactionsIDArr.length ? await getDataDetailByTransaction(transactionsIDArr) : [];
                setDetails(detailsData);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        loadDataDetails();
    }, [transactions]);

    useEffect(() => {
        if (!categories.length || !details.length) return;

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
                    type_trans: detail.value < 0 ? 'add' : transaction.type
                };
            });

            acc.push({
                ...transaction,
                details: enrichedDetails
            });

            return acc;
        }, []);
        setTransactionDetails(transactionDetailsJoin);

        Swal.close();
    }, [details]);

    return { transactions, details, transactionDetailsFiltered, loadDataTransaction };
}