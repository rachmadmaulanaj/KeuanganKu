export const globalFunction = () => {
    console.log('This is a global function');
};

export const convertDateFormat = (date) => {
    const date_obj = new Date(date);
    const formatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    let formattedDateTime = formatter.format(date_obj);
    formattedDateTime = formattedDateTime.replace('pukul', '').replace('.', ':');

    return formattedDateTime;
}
export const convertRupiahFormat = (value) => {
    const string_value = value.toString();
    const formatted_value = string_value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${formatted_value},-`;
}
export const convertThousandFormat = (value) => {
    const string_value = value.toFixed(0).toString();
    const formatted_value = string_value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formatted_value;
}