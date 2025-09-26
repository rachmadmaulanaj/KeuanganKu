import { useRef, useState, useEffect, useCallback } from 'react'
import { getDataTransactionYears } from '../services/transactionService'
import moment from 'moment'

export default function useFormInput(categories) {
    const filterMonthOptions = useRef([
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
    ]);
    const filterTypeOptions = useRef([
        { value: 'minus', label: 'Pengeluaran' },
        { value: 'add', label: 'Pemasukan' },
    ]);

    const [filters, setFilters] = useState({
        month: parseInt(moment().format('M')),
        year: parseInt(moment().format('YYYY')),
        category: '',
        search: '',
        type: 'minus',
    });
    const [filterOptions, setFilterOptions] = useState({
        month: filterMonthOptions.current,
        year: [],
        category: [],
        type: filterTypeOptions.current
    });

    const handleChangeFilters = useCallback((e) => {
        const { name, value } = e.target;
        const newData = { [name]: value };
        if (name === 'year' || name === 'month') {
            newData.search = '';
            newData.category = '';
        }

        setFilters(prev => {
            const next = { ...prev, ...newData };
            const isSame = Object.keys(next).every(key => prev[key] === next[key]);
            return isSame ? prev : next;
        });
    }, []);

    useEffect(() => {
        const categoryOptions = [
            { value: '', label: 'Semua Kategori' },
            ...categories.map(category => ({ value: category.id, label: category.name }))
        ];
        setFilterOptions(prev => ({ ...prev, category: categoryOptions }));
    }, [categories]);

    useEffect(() => {
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