import { useState, useEffect, useCallback } from 'react'
import { getDataTransactionYears } from '../services/transactionService'
import moment from 'moment'

export default function useFormInput() {
    const filterTypeOptions = [
        { value: 'transaction', label: 'Transaksi' },
        { value: 'detail', label: 'Detail' }
    ];
    const filterMonthOptions = [
        { value: 1, label: 'Januari' },
        { value: 2, label: 'Februari' },
        { value: 3, label: 'Maret' },
        { value: 4, label: 'April' },
        { value: 5, label: 'Mei' },
        { value: 6, label: 'Juni' },
        { value: 7, label: 'Juli' },
        { value: 8, label: 'Agustus' },
        { value: 9, label: 'September' },
        { value: 10, label: 'Oktober' },
        { value: 11, label: 'November' },
        { value: 12, label: 'Desember' }
    ];

    const [filters, setFilters] = useState({
        type: '',
        month: '',
        year: '',
    });
    const [filterOptions, setFilterOptions] = useState({
        type: filterTypeOptions,
        month: filterMonthOptions,
        year: [],
    });

    const handleChangeFilters = useCallback((e) => {
        const { name, value } = e.target;
        const newData = { [name]: value };
        if (name !== 'search') newData.search = '';

        setFilters(prev => {
            const next = { ...prev, ...newData };
            const isSame = Object.keys(next).every(key => prev[key] === next[key]);
            return isSame ? prev : next;
        });
    }, [filters]);

    useEffect(() => {
        setFilters({
            type: 'transaction',
            month: parseInt(moment().format('M')),
            year: parseInt(moment().format('YYYY'))
        });

        const loadDataTransactionYears = async () => {
            try {
                const transactionYearsData = await getDataTransactionYears();
                const transactionYearsDataFormated = transactionYearsData.map(value => (
                    { value: value.year, label: value.year }
                ));
                setFilterOptions(prev => ({ ...prev, year: transactionYearsDataFormated }));
            } catch (error) {
                console.error('Error fetching transaction years:', error);
            }
        };

        loadDataTransactionYears();
    }, []);

    return { filters, filterOptions, handleChangeFilters };
}