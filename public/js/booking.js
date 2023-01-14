const apiURL_Seats = `http://127.0.0.1:3000/api/v1/get-seats/`
const apiURL_Booking = `http://127.0.0.1:3000/api/v1/post-booking`
const apiURL_GetBooking = `http://127.0.0.1:3000/api/v1/get-booking/`
function renderSeats(rows, seats, listBooking) {
    let divData = '';
    for (let i = 0; i < rows.length; i++) {
        divData += ` 
        <ul class="seat-row ng-scope m-b-2">
            <li class="ng-binding index">${rows[i].seat_row}</li>
            <li class="seat-col-wrapper seat-width">
                <ul class="seat-col">`;
        let a = -(rows[i].count) / 2;
        let divData2 = ``;
        for (let j = 0; j < seats.length; j++) {
            if (seats[j].seat_row == rows[i].seat_row) {
                if (seats[j].seat_status == 1) {
                    if (seats[j].seat_type == 'Normal') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-normal" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else if (seats[j].seat_type == 'Vip') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-vip" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-sweetbox" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                }
                else if(seats[j].seat_status == 2){
                    if (seats[j].seat_type == 'Normal') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-normal seat-selected" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else if (seats[j].seat_type == 'Vip') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-vip seat-selected" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-sweetbox seat-selected" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                }
                else {
                    if (seats[j].seat_type == 'Normal') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-normal seat-ng" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else if (seats[j].seat_type == 'Vip') {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-vip seat-ng" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                    else {
                        divData2 +=
                            `
                        <li style="transform: translate(${a * 110}%,0);" class="ng-binding ng-scope valiable seat-sweetbox seat-ng" id="${rows[i].seat_row}${seats[j].seat_id}">${seats[j].seat_column}</li>
                        `
                    }
                }
                a++;
            }
        }
        divData = divData + divData2 +
            `
                </ul>
            </li>
            <li class="ng-binding index">${rows[i].seat_row}</li>
        </ul>
        `
    }
    document.getElementById('renderSeats').innerHTML = divData;
}

async function getData() {
    let path = window.location.pathname;
    let scheduleID = Number(path.slice(26));
    let spinner = document.getElementById('spinnerLoading');
    if (spinner.className.indexOf('hide-spinner') != -1) {
        spinner.classList.toggle('hide-spinner');
        spinner.classList.toggle('show-spinner');
    }
    let data = JSON.parse(JSON.stringify(await fetch(apiURL_Seats + `${scheduleID}`).then((res) => res.json())));
    let listBooking = JSON.parse(JSON.stringify(await fetch(apiURL_GetBooking + `${scheduleID}`).then((res) => res.json())));
    if (data.status == true || data.status == false) {
        if (spinner.className.indexOf('hide-spinner') == -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
    }
    if (data.status == false) {
        alert(data.message);
    }
    else {
        if(listBooking.status == true){
            for( let i = 0; i< listBooking.booking.length; i++){
                for(let j = 0; j<(data.seats).length; j++){
                    if(listBooking.booking[i].seat_id == data.seats[j].seat_id){
                        data.seats[j].seat_status = listBooking.booking[i].seat_status
                    }
                }
            }
        }
        renderSeats(data.rows, data.seats);
    }
}
getData();
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
function convertCurrencyToNumber(str) {
    return Number(str.replace(/[^0-9.-]+/g, ""));
}

let seatID = [];
document.getElementById('renderSeats').addEventListener('click', (e) => {
    if (e.target.className.indexOf('valiable') != -1) {
        if( e.target.className.indexOf('seat-selected') == -1){
            if (e.target.className.indexOf('seat-selecting') == -1) {
                e.target.classList.toggle('seat-selecting');
                let strID = e.target.id;
                let row = strID.slice(0, 1);
                let id = Number(strID.slice(1));
                let column = e.target.innerText;
                let seats = document.getElementById('seats').innerText;
                if (seats == '') {
                    seats = seats + row + column;
                }
                else {
                    seats = seats + ',' + row + column;
                }
                document.getElementById('seats').innerText = seats;
                let price = convertCurrencyToNumber(document.getElementById('price').innerText);
                let obj = {};
                if (e.target.className.indexOf('seat-normal') != -1) {
                    price = price + 100000;
                    obj = {
                        seat_id: id,
                        seat_status: 2,
                        price: 100000
                    }
    
                } else if (e.target.className.indexOf('seat-vip') != -1) {
                    price = price + 105000;
                    obj = {
                        seat_id: id,
                        seat_status: 2,
                        price: 105000
                    }
                }
                else {
                    price = price + 110000;
                    obj = {
                        seat_id: id,
                        seat_status: 2,
                        price: 110000
    
                    }
                }
                seatID.push(obj);
                document.getElementById('price').innerText = formatCash(price.toString());
            }
            else {
                e.target.classList.toggle('seat-selecting');
    
                let strID = e.target.id;
                let row = strID.slice(0, 1);
                let id = Number(strID.slice(1));
                for (let i = 0; i < seatID.length; i++) {
                    if (seatID[i].seat_id == id) {
                        seatID.splice(i, 1);
                    }
                }
    
                let column = e.target.innerText;
                let strSeat = row + column;
                let seats = document.getElementById('seats').innerText;
                let arr = seats.split(',');
                let newArr = arr.reduce((obj, item) => {
                    if (item != strSeat) {
                        obj.push(item);
                    }
                    return obj;
                }, [])
                seats = newArr.toString();
                document.getElementById('seats').innerText = seats;
    
                let price = convertCurrencyToNumber(document.getElementById('price').innerText);
                if (e.target.className.indexOf('seat-normal') != -1) {
                    price = price - 100000;
                } else if (e.target.className.indexOf('seat-vip') != -1) {
                    price = price - 105000;
                }
                else {
                    price = price - 110000;
                }
                document.getElementById('price').innerText = formatCash(price.toString());
            }
        }
    }
})

document.getElementById('btnCheckout').addEventListener('click', () => {
    if (seatID.length == 0) {
        console.log(1);
        document.getElementById('modalBody').innerText = "Vui lòng chọn ghế";
    }
    else {
        let path = window.location.pathname;
        let scheduleID = Number(path.slice(26));
        let booking = {
            user_id: Number(document.getElementsByClassName('main-img')[0].id),
            schedule_id: scheduleID,
        };
        let InforBooking = seatID.reduce((arr, item) => {
            let newObj = {
                ...booking,
                ...item
            }
            arr.push(newObj);
            return arr;
        }, [])
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(InforBooking)
        };
        fetch(apiURL_Booking, postMethod)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    // document.getElementById('errAgree').innerText = data.message;
                    alert(data.message);
                }
                else {
                    document.getElementById('modalBody').innerText = "Cám ơn bạn đã sử dụng dịch vụ của chúng tôi";
                    document.getElementById('closeBtn').addEventListener('click',()=>{
                        window.location.href = '/NowShowing';
                    })
                    // window.location.href = '/login';
                }
            })
            .catch(err => {
                console.log(err);
        })
    }
})
