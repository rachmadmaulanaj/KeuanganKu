import supabase from '../../../lib/supabaseClient'
import moment from 'moment'

export const getDataTransactionsByPeriod = async (month, year) => {
    if (!month || !year) throw new Error('month dan year wajib diisi');

    const startDate = moment(`${year}-${month}`, 'YYYY-M').startOf('month').format('YYYY-MM-DDTHH:mm:ss')
    const endDate = moment(`${year}-${month}`, 'YYYY-M').endOf('month').format('YYYY-MM-DDTHH:mm:ss')

    const { data, error } = await supabase
        .from('transactions')
        .select('id, date, type, description, value')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('id', { ascending: false });

    if (error) throw error;
    return data;
};

export const getDataTransactionYears = async () => {
    const { data, error } = await supabase
        .rpc('get_unique_years');

    if (error) throw error;
    return data;
};

export const addTransactions = async (dataInput) => {
    const { data, error } = await supabase
        .from('transactions')
        .insert([dataInput])
        .select('id');

    if (error) throw error;
    return data;
};