import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import user from "../../Images/user.png";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function MenuListComposition() {
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {

    }, []);

    const handleLogout = () => {
        // Clear the localStorage
        localStorage.clear();

        // Navigate to the logout page (Replace '/logout' with your desired logout route)
        navigate('/');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        // Check if the clicked element is the "Logout" MenuItem
        const logoutMenuItem = document.getElementById('logout-menu-item');
        if (logoutMenuItem && logoutMenuItem.contains(event.target)) {
            handleLogout();
            return;
        }

        setOpen(false);
    };



    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function logOut() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <Stack direction="row" spacing={2}>
            <Paper>
                {/* Put your content inside the Paper component */}
            </Paper>
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <img style={{marginLeft: -80}} width={20} src={user} alt=""/>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem>Profile</MenuItem>
                                        <MenuItem>My account</MenuItem>
                                            <MenuItem id="logout-menu-item" onClick={logOut}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
