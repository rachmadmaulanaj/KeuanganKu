import supabase from '../../../lib/supabaseClient'

export const getDataCategory = async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon')
        .order('id', { ascending: true });

    if (error) throw error;
    return data;
};