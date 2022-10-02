/**
 * RAPID API - SPOTIFY FETCH
 * 
 */

//import
const axios = require('axios')

//set api configs
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const URL = 'https://spotify23.p.rapidapi.com/search/'

//fetch search api
const spotify_search = async (req, res) => {
    
    //prep query params
    let offset = ("offset" in req.query) ? req.query.offset : 0;
    let query = ("q" in req.query) ? req.query.q : '';
    let options = {
        method: 'GET',
        url: URL,
        params: { type: 'multi', q: query, locale: 'en-US', offset: offset, limit: '20' },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    //set default response
    const empty_res = { tracks: {totalCount:0, items:[]}, artists: {totalCount:0, items:[]} }

    //run fetch
    //on pass return data. on error return default empty res
    await axios.request(options)
    .then(function (response) {
        console.log(response)
        let _response = {
            tracks: response.data.tracks,
            artists: response.data.artists
        }
        return res.json(_response)
    }).catch(function (error) {
        console.log('error', error);
        return res.json(empty_res)
    });

};

module.exports = {
    spotify_search:spotify_search,
}
