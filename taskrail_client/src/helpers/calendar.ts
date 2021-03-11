export function getPreviousSunday(date: Date) {
    date = new Date(date);
    var day = date.getDay(),
        diff = date.getDate() - day; 
    return new Date(date.setDate(diff));
};