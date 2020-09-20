import * as moment from "moment";

export function countdown(time) {
    let ct = '00:00:00';
    const now = moment()
    const end = moment(time)
    const duration = moment.duration(end.diff(now));
    const hours = duration.hours().toString().padStart(2, "0")
    const minutes = duration.minutes().toString().padStart(2, "0")
    const seconds = duration.seconds().toString().padStart(2, "0")
    if(duration._milliseconds > 0) {
        ct = `${hours}:${minutes}:${seconds}`
    }
    return ct;
}

export function rateToString(rate, isNull = false) {
    try {
        if (isNull || rate === null) {
            return "-";
        } else {
            const rateString = parseFloat(Math.round(rate * 100) / 100);
            return rateString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    } catch (e) {
        return isNull ? "-" : "0";
    }
}