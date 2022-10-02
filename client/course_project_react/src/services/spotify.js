/**
 * References:
 * [1] React api fetch - https://bobbyhadz.com/blog/react-fetch-data-on-button-click#:~:text=To%20fetch%20data%20on%20button,variables%20and%20render%20the%20data.
 */

/**
 * Refs: [1]
 * @param {*} query string search
 * @param {*} offset page number
 * @returns 
 */
export async function getSpotify(query='', offset=0){

    //set default response
    let response = { tracks: {totalCount:0, items:[]}, artists: {totalCount:0, items:[]} }

    //if query is empty string return default empty response
    if(query !== ''){ 

        //prep query params
        let query_params = new URLSearchParams();
        query_params.append('q', query.toLowerCase());
        query_params.append('offset', offset);

        //run retch
        await fetch('/api/spotify/?' + query_params.toString())
        .then((res) => {
            if(res.status === 200){
                response = res.json();
            }
        })
        .catch((error) => {
            console.log(error);
        })

    }

    return response 
}
