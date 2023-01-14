var myCarousel = document.querySelector('#carouselExampleDark')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: true
})

const apiURL1 = 'http://127.0.0.1:3000/api/v1/get-one-movie';
const apiURL2 = 'http://127.0.0.1:3000/api/v1/getAllCity';
const apiURL5 = 'http://127.0.0.1:3000/api/v1/get-like-movie/';
const apiURL6 = 'http://127.0.0.1:3000/api/v1/put-like-movie/';

let movies = document.getElementsByClassName('product-image');
for (let i = 0; i < movies.length; i++) {
    movies[i].addEventListener('click', () => {
        window.location.href = `http://127.0.0.1:3000/detail-movie/${movies[i].id}`;
    })
}
let btnBooking = document.getElementsByClassName('grid-4-img')[0];
btnBooking.addEventListener('click', async (e) => {
    if(e.target.className.indexOf('btn-booking') != -1){
        let id = e.target.id;
        window.location.href = `http://127.0.0.1:3000/detail-movie/${id}`;
    }
})
let btnLike = document.getElementsByClassName('btn-like');
let txtLike = document.getElementsByClassName('txt-like');
for(let i = 0; i< btnLike.length;i++){
    btnLike[i].addEventListener('click',async()=>{
        let id = Number(btnLike[i].id);
        let result = JSON.parse(JSON.stringify(await fetch(apiURL5 + `${id}`).then((res) => res.json())));
        if (btnLike[i].className.indexOf('dislike') == -1) {
            btnLike[i].classList.toggle('dislike');
            let like = result.data[0].movie_like + 1;
            txtLike[i].innerText = `Like ${like}`;
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
            btnLike[i].classList.toggle('dislike');
            let like = result.data[0].movie_like - 1;
            txtLike[i].innerText = `Like ${like}`;
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
}