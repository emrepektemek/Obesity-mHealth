import aylar from "../constants/aylar";

export function getTodayDate(){

    let tarih = new Date();

    return tarih.getDate() + ' '+(aylar[tarih.getMonth()]) +' '+  tarih.getFullYear();
}

export function getTodayDateWithClock(tarih){

    return tarih.getDate() + ' '+(aylar[tarih.getMonth()]) +' '+  tarih.getFullYear() + ' ' + tarih.getHours()+':'+tarih.getMinutes()+':'+tarih.getSeconds();
}
