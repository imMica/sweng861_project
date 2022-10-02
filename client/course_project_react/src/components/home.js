/**
 * References:
 * [1] Pass data from Child to Parent Component https://www.youtube.com/watch?v=BtImABK_VHo
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Search }  from '../components/search.js'
import { TrackList }  from '../components/tracks.js'
import { ArtistList }  from '../components/artists.js'

/**
 * 
 * @returns Returns Grid divs to main components (search, tracks, artists, and pagination)
 */
export function BasicGrid() {

    //state data returned by the search bar
    const {trackResults, artistResults, searchRenderer, paginationRenderer} = Search()

    //set div padding
    const styles = {
        padding: "50px 150px 25px 150px"
    }
    
    //return html grid of the landing page
    return (
        <Box sx={{ flexGrow: 1 }} style={styles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {searchRenderer}
                </Grid>
                <Grid item xs={6}>
                    <h3>Tracks</h3>
                    <TrackList {...{trackResults}} />
                </Grid>
                <Grid item xs={6}>
                    <h3>Artists</h3>
                    <ArtistList {...{artistResults}} />
                </Grid>
            </Grid>
            {paginationRenderer}
        </Box>
    );
}
