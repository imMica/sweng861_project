
/**
 * Component for search bar and pagination
 * 
 * References:
 * [1] React text fields - https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled  
 * [2] Pagination - https://mui.com/material-ui/react-pagination/#api
 * [3] Stack - https://mui.com/material-ui/react-stack/
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MusicNote from '@mui/icons-material/MusicNote';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getSpotify } from '../services/spotify.js'

/**
 * @returns Search bar and pagination component
 */
export function Search() {

    //set component states
    const itemsPerPage = 20; //fix 20 items max per page
    const [searchQuery, setSearchQuery] = React.useState("");
    const [trackResults, setTrackResults] = React.useState([]);
    const [artistResults, setArtistResults] = React.useState([]);
    const [loader, setLoader] = React.useState(null);
    const [pageCount, setPageCount] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    //spotify fetch call
    const fetchSpotify = async (offset=0) => {
        let res = await getSpotify(searchQuery, offset); //query string and offsets

        //set track and artist lists
        setTrackResults(res.tracks.items);
        setArtistResults(res.artists.items);
        
        //set max item count for pages
        const totalTrackCount = res.tracks.totalCount;
        const totalArtistCount = res.artists.totalCount;
        const maxCount = Math.max(totalTrackCount, totalArtistCount);

        //set page count
        let pg_count = Math.round(maxCount/itemsPerPage);
        
        //if no totalcount and pagecount is NaN set page count to 0
        if(isNaN(pageCount)) { pg_count = 0};
        setPageCount(pg_count);

        //reset loading icon
        setLoader(null);

        return
    }

    //on change update input state
    const handleOnChange = (e) => {
        setSearchQuery(e.target.value); 
    }

    //on enter trigger fetch
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); //prevent default enter key event
            setLoader(<CircularProgress size="1rem"/>);
            const promise = fetchSpotify();
            promise.then(() => {setCurrentPage(1)}); //reset page number on new search})
        }
    }

    //page change event handler trigger fetch
    const onPageChange = (e, page) => {
        const offset = (itemsPerPage * page) - 20;
        setLoader(<CircularProgress size="1rem"/>);
        setCurrentPage(page);
        fetchSpotify(offset);
    }

    //return search and pagination component
    return ({
        trackResults,
        artistResults,
        searchRenderer: <Box
            component="form"
            noValidate
            autoComplete="off">
            <TextField
                id="outlined-name"
                label="Search Track/Artist"
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={handleOnChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MusicNote />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {loader}
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
            </Box>,
        paginationRenderer: <Stack alignItems="center">
            <Pagination 
                count={pageCount} 
                variant="outlined" 
                color="primary" 
                onChange={onPageChange}
                page={currentPage}
            />
            </Stack>
    });
    
}
