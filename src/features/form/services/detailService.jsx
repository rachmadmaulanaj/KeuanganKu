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

export const addDetails = async (dataInput) => {
    const { data, error } = await supabase
        .from('details')
        .insert([dataInput])
        .select('id');

    if (error) throw error;
    return data;
};

export const updateDetails = async (idUpdate, dataUpdate) => {
    const { data, error } = await supabase
        .from('details')
        .update([dataUpdate])
        .eq('id', idUpdate)
        .select('id');

    if (error) throw error;
    return data;
};

export const deleteDetail = async (id) => {
    const { data, error } = await supabase
        .from('details')
        .delete()
        .eq('id', id)
        .select('id');

    if (error) throw error;
    return data;
};