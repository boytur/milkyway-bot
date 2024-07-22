export const formatUTCtoThai = (dateTimeString: string): string =>{
    try {
        const date = new Date(dateTimeString);
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleString('th-TH', options);
        return formattedDate;
    }
    catch (e) {
        console.error("Couldn't format dateTimeString", e)
        return "";
    }
}