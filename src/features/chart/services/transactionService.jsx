import supabase from '../../../lib/supabaseClient'
import moment from 'moment'

export const getDataTransactionsByYear = async (year) => {
    if (!year) throw new Error('year wajib diisi');

    const startDate = moment(`${year}`, 'YYYY')
        .startOf('year')
        .format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment(`${year}`, 'YYYY')
        .endOf('year')
        .format('YYYY-MM-DDTHH:mm:ss');

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