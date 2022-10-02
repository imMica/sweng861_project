import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

/**
 * References:
 * [1] List Components https://mui.com/material-ui/react-list/
 * 
 * @param {*} searchResults
 * @returns list component
 */
export function TrackList({ trackResults }) {

    //set col div style
    const styles = {
        height: "70vh",
        overflow: 'auto',
    }

    //get artists name
    const getArtist = (data) => {
        if(data.artists){
            let artists = data.artists.items;
            return (artists.length > 0) ? artists[0].profile.name : 'None';
        }
        return 'None'
    }

    //get album track img cover
    const getCoverArt = (data) => {
        if(data.albumOfTrack){
            let cover = data.albumOfTrack.coverArt.sources;
            return (cover.length > 0) ? cover[0].url : 'None';
        }
        return 'None'
    }

    //get song duration
    const getDuration = (data) => {
        if(data.duration.totalMilliseconds){
            let millis = data.duration.totalMilliseconds
            let minutes = Math.floor(millis/60000)
            let seconds = millis % 60000 //left over
            seconds = (seconds/1000).toFixed(0)
            return `${minutes}:${seconds}`
        }
        return '0:00'
    }

    //for each track return div component of the song
    const getItems = () => {
        let items = ''
        items = trackResults.map((item, index) => {
            let avatar = getCoverArt(item.data)
            let songTitle = item.data.name
            let artist = getArtist(item.data)
            let contentRating = item.data.contentRating.label
            let duration = getDuration(item.data)
            return  <div key={item.data.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={songTitle}
                                secondary={
                                    <React.Fragment>
                                        <span><b>Artist:</b> {artist} </span><br></br>
                                        <span><b>Duration:</b> {duration} </span><br></br>
                                        <span><b>Content Rating:</b> {contentRating} </span>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
        })

        return items
    }

    //return div list of tracks
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={styles}>
            {getItems()}
        </List>
    );
}
