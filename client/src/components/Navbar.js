import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { AppContext } from '../App';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});

const Search = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '40%'
}));

const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.up('sm')]: {
        display: 'flex'
    }
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up('sm')]: {
        display: 'none'
    }
}));

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate()
    let username = '';

    if (token) {
        username = jwt_decode(token).username;
    }

    const handleLogout = async () => {
        try {
            const res = await axios.get('users/logout', {
                headers: {
                    'x-access-token': null,
                },
            });
            if (res.status === 200) {
                setToken(null);
                navigate('/');
            }
        } catch (error) {
            setToken(null);
        }
    };

    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    InspireInk
                </Typography>
                <HistoryEduIcon sx={{ display: { xs: 'block', sm: 'none' } }} />
                <Search><InputBase placeholder="search..." /></Search>
                <Icons>
                    <Badge badgeContent={3} color='error'>
                        <MailIcon />
                    </Badge>
                    <Badge badgeContent={2} color='error'>
                        <NotificationsIcon />
                    </Badge>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
                        onClick={(e) => setOpen(true)}
                    />
                </Icons>
                <UserBox onClick={(e) => setOpen(true)}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg'
                    />
                    <Typography variant="span">{username}</Typography>
                </UserBox>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}

export default Navbar;