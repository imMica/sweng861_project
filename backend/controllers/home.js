const axios = require('axios')
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const URL = 'https://spotify23.p.rapidapi.com/search/'

const spotify_search = async (req, res) => {
    console.log(req.query)
    let offset = ("offset" in req.query) ? req.query.offset : 0;
    let query = ("q" in req.query) ? req.query.q : '';
    let options = {
        method: 'GET',
        url: URL,
        params: { type: 'multi', q: query, locale: 'en-US', offset: offset, limit: '10' },
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    const empty_res = { tracks: {totalCount:0, items:[]}, artists: {totalCount:0, items:[]} }
    await axios.request(options)
    .then(function (response) {
        console.log(response.data)
        //temp figure out why status 400 is not in the catch
        if(response.data.error || response.data == '' || Object.keys(response.data).length === 0){ 
            return res.json(empty_res) 
        }
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
