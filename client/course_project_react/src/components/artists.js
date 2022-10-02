import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { AccountCircleRounded } from '@mui/icons-material';

/**
 * Component for artist list
 * 
 * @param {obj} artistResults 
 * @returns 
 */
export function ArtistList({ artistResults }) {

    //list div style
    const styles = {
        height: "70vh",
        overflow: 'auto',
    }

    const pagination_styles = {
        "padding-top": "20px",
    }

    //get img avatar
    const getVisual = (data) => {
        if(data.visuals.avatarImage == null){
            return <AccountCircleRounded/>
        }
        let vis = data.visuals.avatarImage.sources
        if(vis.length > 0) {
            let url = vis[0].url
            return <Avatar alt="Remy Sharp" src={url} />
        }
        return <AccountCircleRounded/>
    }

    //for each arists, create an item component
    let items = ''
    items = artistResults.map((item, index) => {
        let avatar = getVisual(item.data)
        let artist = item.data.profile.name
        return  <div key={item.data.uri}>
                    <ListItem>
                        <ListItemAvatar>
                            {avatar}
                        </ListItemAvatar>
                        <ListItemText
                            primary={artist}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
    })

    //return artist list component
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={styles}>
            {items}
        </List>
    );
}
