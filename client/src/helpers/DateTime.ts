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

export function getMonthStr(date: Date){
    var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()]; 
}

export function parseLocalDateFromDateStr(dateString: string){
    // Correctly parse date string in the local time without a wacky day leap
    // dateString: yyyy-mm-dd
    // Reference: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    return new Date(dateString.replace(/-/g, '\/'));
}

export function parseOnlyDateFromUTC(utcDateString: string){
    let date = utcDateString.split('-')
    let dateStr = date[0] + '/' + date[1] + '/' + date[2].split("T")[0]
    return new Date(dateStr);
}

export function getDateStr(date: Date){
    let [month, day, year] = [("0" + (date.getMonth()+1).toString()).slice(-2), ("0" + (date.getDate().toString())).slice(-2), date.getFullYear()];
    return year + "-" + month + "-" + day;
}

export function getMonthAndDay(date: Date){
    let [month, day] = [(date.getMonth() + 1).toString(), date.getDate().toString()];
    return month + "/" + day;
}