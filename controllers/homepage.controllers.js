let GetHomePage = async(req,res)=>{
    return res.render('homepage.ejs');
}

module.exports = {GetHomePage};