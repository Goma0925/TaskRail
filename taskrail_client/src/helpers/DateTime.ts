export function getPreviousSunday(date: Date) {
    date = new Date(date);
    var day = date.getDay(),
        diff = date.getDate() - day; 
    return new Date(date.setDate(diff));
};

export function getNDaysLater(date: Date, nDays:number){
    date = new Date(date);
    date.setDate(date.getDate()+nDays)
    return date;
}

export function LocalDateParse(dateString: string){
    // Correctly parse date string in the local time without a wacky day leap
    // Reference: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    return new Date(dateString.replace(/-/g, '\/'));
}

export function getDateStr(date: Date){
    let [month, day, year] = [("0" + date.getMonth().toString()).slice(-2), ("0" + (date.getDate().toString())).slice(-2), date.getFullYear()];
    return year + "-" + month + "-" + day;
}