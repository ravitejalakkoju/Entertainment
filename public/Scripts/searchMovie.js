const axios = require('axios');

//http://www.omdbapi.com/?i=tt3896198&apikey=dbaf7dd7

class searchMovie {
    constructor(moviename){
        this.moviename = moviename;
    }

    async getMovieDetails(type) {
        try{
                    let movie = [], num = 1,i = 1;
                    while(i <= num) {
                    // const res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&page=${i}&plot=full&apikey=dbaf7dd7`);
                    const res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&type=${type}&page=${i}&plot=full&apikey=86774b92`);
                    const finalData = res.data;
                    let totalResults = finalData.totalResults;
                    num = Math.ceil(totalResults / 10) ;
                    Array.prototype.push.apply(movie,finalData.Search);
                    i++;
                    }

                    return movie;
        } catch(error) {
            alert(error);
        }
    }

    async getMovieDetailsByFilters(year='All') {
        try{
            //http://www.omdbapi.com/?i=tt3896198&apikey=86774b92
            let res;

            if((year === 'All') || (year === 'select')){
                res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&apikey=86774b92`);
            // } else if(year !== 'All' && (type === 'All' || type === 'select')){
            //     // console.log(true);
            //     res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&y=${year}&apikey=86774b92`);
            // } else if((year === 'All' || year === 'select') && type !== 'All'){
            //     res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&type=${type}&apikey=86774b92`);
            //     console.log(res);
            }
             else if(year !== 'All' && year !== 'select'){
                res = await axios(`http://www.omdbapi.com/?s=${this.moviename}&t=${year}&apikey=86774b92`);
            }
                    // console.log(res);
                    const movie = res.data.Search;
                    // console.log(movie);

                    return movie;
        } catch(error) {
            alert(error);
        }
    }

    async getMovieDetailsById(id) {
        try{
            const res = await axios(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=dbaf7dd7`);
            // console.log(res);
            const movie = res.data;

            return movie;
        } catch(error) {
            alert(error);
        }
            }
}

module.exports = searchMovie;