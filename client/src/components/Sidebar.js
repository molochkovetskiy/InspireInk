import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Link } from "react-router-dom";

const Sidebar = ({ mode, setMode }) => {
    return (
        <Box
            flex={1}
            p={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
        >
            <Box position='fixed'>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/feed'>
                            <ListItemIcon>
                                <ArticleIcon />
                            </ListItemIcon>
                            <ListItemText primary='Feed' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/prompts'>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='#'>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary='Settings' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component='a' href='simple-list'>
                            <ListItemIcon>
                                <ModeNightIcon />
                            </ListItemIcon>
                            <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
};

export default Sidebar;