import supabase from '../../../lib/supabaseClient'

export const checkPasscode = async (password) => {
    const { data, error } = await supabase
        .from('passcodes')
        .select('id')
        .eq('code', password)
        .limit(1);

    if (error) throw error;
    return data.length ? true : false;
};