const {pool} = require('../config/connectMySQL');

async function GetALLFilmNowShowing(){
    const [rows] =await pool.query(`
    SELECT tbl_movies.movie_id, tbl_rated.rated_name, tbl_rated.rated_description, tbl_movies.movie_poster, tbl_movies.movie_name, tbl_movies.movie_length, tbl_movies.movie_release, tbl_movies.movie_like, tbl_movies.movie_poster2
    FROM tbl_rated
    JOIN tbl_movies ON tbl_rated.rated_id = tbl_movies.movie_rated
    WHERE tbl_movies.movie_status = 1
    ORDER BY tbl_movies.movie_id ASC`);
    return rows;
}

async function GetOneMovie(id){
    const [rows] =await pool.query(`
    SELECT tbl_movies.movie_id, tbl_rated.rated_name, 
    tbl_rated.rated_description, tbl_movies.movie_poster, 
    tbl_movies.movie_name, tbl_movies.movie_length, tbl_movies.movie_release, 
    tbl_movies.movie_like, tbl_movies.movie_trailer, tbl_movies.movie_director,
    tbl_movies.movie_actor, tbl_movies.movie_description, tbl_movies.movie_language,
    tbl_movies.movie_poster2
    FROM tbl_rated
    JOIN tbl_movies ON tbl_rated.rated_id = tbl_movies.movie_rated
    WHERE tbl_movies.movie_id = ${id}`);
    return rows;
}

async function GetGenreOfOneMovie(id){
    const [rows] =await pool.query(`
    SELECT tbl_movie_genres.movie_id, tbl_genres.genre_name
    FROM tbl_movie_genres
    JOIN tbl_genres ON tbl_movie_genres.genre_id = tbl_genres.genre_id
    WHERE tbl_movie_genres.movie_id = ${id}
    GROUP BY tbl_movie_genres.movie_id, tbl_genres.genre_name`);
    return rows;
}

async function GetFormatOfOneMovie(id){
    const [rows] =await pool.query(`
    SELECT tbl_movie_format.movie_id, tbl_format.format_name
    FROM tbl_movie_format
    JOIN tbl_format ON tbl_movie_format.format_id = tbl_format.format_id
    WHERE tbl_movie_format.movie_id = ${id}
    GROUP BY tbl_movie_format.movie_id, tbl_format.format_name`);
    return rows;
}
async function GetRoomOfMovie(id,date){
    const [rows] =await pool.query(`
    SELECT room_id
    FROM tbl_schedule
    WHERE movie_id = ${id} AND schedule_date = '${date}'`);
    return rows;
}
async function GetAllCityOfCinemas(id,date){
    const [rows] =await pool.query(`
    SELECT DISTINCT (cinema_city)
    FROM (SELECT DISTINCT(cinema_id)
    FROM (SELECT room_id
    FROM tbl_schedule
    WHERE movie_id = ${id} AND schedule_date = ${date}) AS r1
    RIGHT JOIN tbl_rooms ON r1.room_id = tbl_rooms.room_id
    GROUP BY cinema_id) AS c1
    RIGHT JOIN tbl_cinemas ON c1.cinema_id = tbl_cinemas.cinema_id
    GROUP BY cinema_city`);
    return rows;
}

async function GetAllSolutionOfMovieInCity(city,id){
    const [rows] =await pool.query(`
    SELECT tbl_format.format_id, tbl_format.format_name
    FROM (SELECT DISTINCT room_solution
    FROM (SELECT cinema_id
    FROM tbl_cinemas
    WHERE cinema_city = '${city}') AS c1
    RIGHT JOIN tbl_rooms ON tbl_rooms.cinema_id = c1.cinema_id
    GROUP BY room_solution) AS r1
    RIGHT JOIN tbl_format ON tbl_format.format_id = r1.room_solution
    RIGHT JOIN tbl_movie_format ON tbl_movie_format.format_id = tbl_format.format_id
    WHERE tbl_movie_format.movie_id = ${id}
    ORDER BY tbl_format.format_id ASC`);
    return rows;
}
async function GetAllCinemasOfMovieInCity(movieID, date,solution, city){
    const [rows] =await pool.query(`
    SELECT tbl_cinemas.cinema_id, cinema_name
    FROM (SELECT DISTINCT cinema_id
    FROM (SELECT schedule_id, room_id, schedule_start, schedule_end
    FROM tbl_schedule
    WHERE movie_id = ${movieID} AND schedule_date = '${date}') AS s1
    LEFT JOIN tbl_rooms ON tbl_rooms.room_id = s1.room_id
    WHERE tbl_rooms.room_solution = ${solution}
    GROUP BY cinema_id) AS c1
    RIGHT JOIN tbl_cinemas ON tbl_cinemas.cinema_id = c1.cinema_id
    WHERE tbl_cinemas.cinema_city = "${city}"
    ORDER BY tbl_cinemas.cinema_id ASC`);
    return rows;
}
async function GetAllScheduleOfMovieInCity(movieID, date,solution, city){
    const [rows] =await pool.query(`
    SELECT schedule_id, s1.room_id, schedule_start, schedule_end, tbl_cinemas.cinema_id, room_name
    FROM (SELECT schedule_id, room_id, schedule_start, schedule_end
    FROM tbl_schedule
    WHERE movie_id = ${movieID} AND schedule_date = '${date}') AS s1
    JOIN tbl_rooms ON tbl_rooms.room_id = s1.room_id
    JOIN tbl_cinemas ON tbl_cinemas.cinema_id = tbl_rooms.cinema_id
    WHERE tbl_rooms.room_solution = ${solution} AND tbl_cinemas.cinema_city = "${city}"
    ORDER BY tbl_cinemas.cinema_id ASC`);
    return rows;
}
async function GetScheduleOfMovieByScheduleID(scheduleID){
    const [rows] =await pool.query(`
    select s1.schedule_date, s1.schedule_start,tbl_rooms.room_name,tbl_format.format_name,tbl_cinemas.cinema_name
    from (SELECT *FROM tbl_schedule 
    WHERE schedule_id = ${scheduleID}) as s1
    join tbl_rooms on tbl_rooms.room_id = s1.room_id
    join tbl_format on tbl_format.format_id = tbl_rooms.room_solution
    join tbl_cinemas on tbl_cinemas.cinema_id = tbl_rooms.cinema_id`);
    return rows;
}
async function UpdateLikeOneMovie(id,like){
    const [rows] =await pool.query(`
    UPDATE tbl_movies
    SET movie_like = ${like}
    WHERE tbl_movies.movie_id = ${id}`);
    return rows;
}
module.exports = {GetALLFilmNowShowing,
    GetOneMovie,
    GetGenreOfOneMovie,
    GetFormatOfOneMovie,
    GetRoomOfMovie,
    GetAllCityOfCinemas,
    GetAllSolutionOfMovieInCity,
    GetAllCinemasOfMovieInCity,
    GetAllScheduleOfMovieInCity,
    GetScheduleOfMovieByScheduleID,
    UpdateLikeOneMovie}