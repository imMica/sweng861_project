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

    const styles = {
        height: "70vh",
        overflow: 'auto',
    }

    const getArtist = (data) => {
        if(data.artists){
            let artists = data.artists.items;
            return (artists.length > 0) ? artists[0].profile.name : 'None';
        }
        return 'None'
    }

    const getCoverArt = (data) => {
        if(data.albumOfTrack){
            let cover = data.albumOfTrack.coverArt.sources;
            return (cover.length > 0) ? cover[0].url : 'None';
        }
        return 'None'
    }

    const getDuration = (data) => {
        if(data.duration.totalMilliseconds){
            let millis = data.duration.totalMilliseconds
            console.log(millis)
            let minutes = Math.floor(millis/60000)
            let seconds = millis % 60000 //left over
            seconds = (seconds/1000).toFixed(0)
            return `${minutes}:${seconds}`
        }
        return '0:00'
    }

    let items = ''
    items = trackResults.map((item, index) => {
        console.log(item)
        let avatar = getCoverArt(item.data)
        let songTitle = item.data.name
        let artist = getArtist(item.data)
        let contentRating = item.data.contentRating.label
        let duration = getDuration(item.data)
        return  <div>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={songTitle}
                            secondary={
                                <React.Fragment>
                                    <p><b>Artist:</b> {artist}</p>
                                    <p><b>Duration:</b> {duration}</p>
                                    <p><b>Content Rating:</b> {contentRating}</p>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
    })

    return (
        <div>
            <h3>Tracks</h3>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={styles}>
                {items}
            </List>
        </div>

    );
}
