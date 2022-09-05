import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { AccountCircleRounded } from '@mui/icons-material';

export function ArtistList({ artistResults }) {

    const styles = {
        height: "70vh",
        overflow: 'auto',
    }

    const getVisual = (data) => {
        console.log(data)
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

    let items = ''
    items = artistResults.map((item, index) => {
        let avatar = getVisual(item.data)
        let artist = item.data.profile.name
        return  <div>
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

    return (
        <div>
            <h3>Artists</h3>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={styles}>
                {items}
            </List>
        </div>

    );
}
