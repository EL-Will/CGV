const {pool} = require('../config/connectMySQL');

async function GetBanner(){
    const [rows] = await pool.query(`
    SELECT * 
    FROM tbl_banner
    WHERE tbl_banner.banner_status = 1`);
    return rows;
}

module.exports = {
    GetBanner}