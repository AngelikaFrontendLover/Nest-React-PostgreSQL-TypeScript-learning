
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
    return formattedDate;
}

export default formatDate;