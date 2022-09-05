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

export function BasicGrid({props}) {

    const {searchQuery, trackResults, artistResults, searchRenderer} = Search()

    const styles = {
        padding: "50px 150px 25px 150px"
    }
   
    return (
        <Box sx={{ flexGrow: 1 }} style={styles}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {searchRenderer}
                </Grid>
                <Grid item xs={6}>
                    <TrackList {...{trackResults}} />
                </Grid>
                <Grid item xs={6}>
                    <ArtistList {...{artistResults}} />
                </Grid>
            </Grid>
        </Box>
    );
}
