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

    let query_params = new URLSearchParams();
    query_params.append('q', query)
    query_params.append('offset', offset)

    let response = { tracks: {totalCount:0, items:[]}, artists: {totalCount:0, items:[]} }
    await fetch('/api/spotify/?' + query_params.toString())
    .then((res) => {
        if(res.status === 200){
            response = res.json()
        }
    })
    .catch((error) => {
        console.log(error);
    })

    return response 
}
