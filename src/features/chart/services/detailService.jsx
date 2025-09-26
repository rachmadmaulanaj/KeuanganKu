import supabase from '../../../lib/supabaseClient'

export const getDataDetailByTransaction = async (trans_id) => {
    if (!trans_id.length) throw new Error('trans_id wajib diisi');

    const { data, error } = await supabase
        .from('details')
        .select('id, trans_id, category_id, date, description, value')
        .in('trans_id', trans_id)
        .order('id', { ascending: false });

    if (error) throw error;
    return data;
};