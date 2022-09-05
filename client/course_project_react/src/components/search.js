
/**
 * References:
 * [1] React text fields - https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled  
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MusicNote from '@mui/icons-material/MusicNote';
import CircularProgress from '@mui/material/CircularProgress';
import { getSpotify } from '../services/spotify.js'

/**
 * Refs: [1]
 * @returns Search bar component
 */
export function Search() {

    const [searchQuery, setSearchQuery] = React.useState("");
    const [trackResults, setTrackResults] = React.useState([]);
    const [artistResults, setArtistResults] = React.useState([]);
    const [loader, setLoader] = React.useState(null)
    //TODO add totalcounts for pagination

    const fetchSpotify = async () => {
        let res = await getSpotify(searchQuery, 0)
        setTrackResults(res.tracks.items)
        setArtistResults(res.artists.items)
        setLoader(null)
    }

    const handleOnChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); //prevent default enter key event
            setLoader(<CircularProgress size="1rem"/>)
            fetchSpotify()
        }
    }

    return ({
        searchQuery,
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
        </Box>
    });
    
}
