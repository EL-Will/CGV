const apiURL1 = 'http://127.0.0.1:3000/api/v1/getAllCity';
const apiURL2 = 'http://127.0.0.1:3000/api/v1/get-solutions/';
const apiURL3 = 'http://127.0.0.1:3000/api/v1/get-cinemas-schedules/';
const apiURL4 = 'http://127.0.0.1:3000/booking/movie/';
const apiURL5 = 'http://127.0.0.1:3000/api/v1/get-like-movie/';
const apiURL6 = 'http://127.0.0.1:3000/api/v1/put-like-movie/';

document.getElementsByClassName('btn-p')[0].addEventListener('click', () => {
    let modalOpen = document.getElementById('body');
    if (modalOpen.className.indexOf('p-r-0-i') == -1) {
        modalOpen.classList.toggle('p-r-0-i');
    }
})

function setMinDate() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    document.getElementById('dateShowing').min = maxDate
}
setMinDate();
function renderCity(data) {
    let divData = '';
    for (let i = 0; i < data.length; i++) {
        divData +=
            `
        <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-l-0 m-t-20">
            <div class="format-btn-city text-align-center">
                ${data[i].cinema_city}
            </div>
        </div>
        `
    }
    document.getElementById('chooseCity').innerHTML = divData;
}
function renderSolution(data) {
    let divData = '';
    for (let i = 0; i < data.length; i++) {
        divData +=
            `
        <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-l-0 m-t-20">
            <div class="format-btn-solution text-align-center" id="${data[i].format_id}">
                ${data[i].format_name}
            </div>
        </div>
        `
    }
    document.getElementById('chooseSolution').innerHTML = divData;
}
function renderSchedule(cinemas, schedules) {
    let divData = '';
    for (let i = 0; i < cinemas.length; i++) {
        divData +=
            `
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-l-0 m-t-20">
            <div class="">
                ${cinemas[i].cinema_name}
            </div>
        </div>
        `
        let divSubData1 = ''
        for (let j = 0; j < schedules.length; j++) {
            if (schedules[j].cinema_id == cinemas[i].cinema_id) {
                divSubData1 +=
                    `
                <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-l-0 m-t-20">
                    <div class="format-btn-solution text-align-center" id="${schedules[j].schedule_id}">
                        ${schedules[j].schedule_start}
                    </div>
                </div>
                `
            }
        }
        let divSubData2 =
            `
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-l-0 m-t-20 p-r-c-15 p-l-c-15">
            <div class="buffer-line"></div>
        </div>
        `
        divData = divData + divSubData1 + divSubData2;
    }
    document.getElementById('chooseSchedule').innerHTML = divData;
}
// If slected date
let date = document.getElementById('dateShowing').value;
if (date != '') {

}
else {
    document.getElementById('dateShowing').addEventListener('change', async () => {
        let path = window.location.pathname;
        let id = Number(path.slice(14));
        let dateShowing = document.getElementById('dateShowing').value;
        let spinner = document.getElementById('spinnerLoading');
        if (spinner.className.indexOf('hide-spinner') != -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
        let data = JSON.parse(JSON.stringify(await fetch(apiURL1 + `/${id}/date/${dateShowing}`).then((res) => res.json())));
        if (data.status == true || data.status == false) {
            if (spinner.className.indexOf('hide-spinner') == -1) {
                spinner.classList.toggle('hide-spinner');
                spinner.classList.toggle('show-spinner');
            }
        }
        if (data.status == false) {
            document.getElementById('alert').innerHTML='<div class="modal-backdrop show"></div>';
            document.getElementById('refresh').classList.toggle('show');
            document.getElementById('refresh').style.display = 'block';
            document.getElementById('modalBody').innerText = data.message;
            let emptyData = [], emptyCinema = [], emptySchedule = [];
            renderCity(emptyData);
            renderSolution(emptyData);
            renderSchedule(emptyCinema, emptySchedule);
            document.getElementById('closeBtn').addEventListener('click', () => {
                document.getElementById('alert').innerHTML='';
                document.getElementById('refresh').classList.toggle('show');
                document.getElementById('refresh').removeAttribute('style');
                document.getElementById('modalBody').innerText = '';
            })
        }
        else {
            renderCity(data.city);
            document.getElementById('chooseCity').addEventListener('click', async (e) => {
                let cover = document.getElementsByClassName('format-btn-city');
                for (let i = 0; i < cover.length; i++) {
                    if (cover[i].className.indexOf('current') != -1) {
                        cover[i].classList.toggle('current');
                    }
                }
                e.target.classList.toggle('current');
                let city = e.target.innerText;
                if (spinner.className.indexOf('hide-spinner') != -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                let solutions = JSON.parse(JSON.stringify(await fetch(apiURL2 + `${city}/movie/${id}`).then((res) => res.json())));
                if (solutions.status == true || solutions.status == false) {
                    if (spinner.className.indexOf('hide-spinner') == -1) {
                        spinner.classList.toggle('hide-spinner');
                        spinner.classList.toggle('show-spinner');
                    }
                }
                if (solutions.status == false) {
                    alert(solutions.message);
                }
                else {
                    renderSolution(solutions.solutions);
                    document.getElementById('chooseSolution').addEventListener('click', async (e) => {
                        let cover = document.getElementsByClassName('format-btn-solution');
                        for (let i = 0; i < cover.length; i++) {
                            if (cover[i].className.indexOf('current') != -1) {
                                cover[i].classList.toggle('current');
                            }
                        }
                        e.target.classList.toggle('current');
                        let idSolution = e.target.id;
                        let schedules = JSON.parse(JSON.stringify(await fetch(apiURL3 + `${id}/date/${dateShowing}/solution/${idSolution}/city/${city}`).then((res) => res.json())));
                        console.log(schedules);
                        renderSchedule(schedules.cinemas, schedules.schedules)
                    })
                }
            })
        }
    })
}

document.getElementById('chooseSchedule').addEventListener('click', async (e) => {
    console.log(e.target);
    if (e.target.className.indexOf('format-btn-solution') != -1) {
        let path = window.location.pathname;
        let movieID = Number(path.slice(14));
        let scheduleID = Number(e.target.id);
        window.location.href = apiURL4 + `${movieID}/schedule/${scheduleID}`;
    }
})

document.getElementsByClassName('btn-like')[0].addEventListener('click', async () => {
    let path = window.location.pathname;
    let id = Number(path.slice(14));
    let result = JSON.parse(JSON.stringify(await fetch(apiURL5 + `${id}`).then((res) => res.json())));
    if (document.getElementsByClassName('btn-like')[0].className.indexOf('dislike') == -1) {
        document.getElementsByClassName('btn-like')[0].classList.toggle('dislike');
        let like = result.data[0].movie_like + 1;
        document.getElementById('Like').innerText = `${like}`;
        let data = {
            movie_like: like
        }
        const putMethod = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL6 + `${id}`, putMethod)
            .then(res => res.json())
            .then(async (data) => {
                if (data.status == false) {
                    // document.getElementById('errAgree').innerText = data.message;
                    alert(data.message);
                }
                else {
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    else{
        document.getElementsByClassName('btn-like')[0].classList.toggle('dislike');
        let like = result.data[0].movie_like - 1;
        document.getElementById('Like').innerText = `${like}`;
        let data = {
            movie_like: like
        }
        const putMethod = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL6 + `${id}`, putMethod)
            .then(res => res.json())
            .then(async (data) => {
                if (data.status == false) {
                    // document.getElementById('errAgree').innerText = data.message;
                    alert(data.message);
                }
                else {
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

