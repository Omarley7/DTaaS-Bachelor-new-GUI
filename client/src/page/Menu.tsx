/* eslint-disable no-console */

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu, openMenu } from 'store/menu';
import { RootState } from 'store/store';
import MenuToolbar from './MenuToolbar';
import DrawerComponent from './DrawerComponent';

const drawerWidth = 240;

function MiniDrawer() {
  const theme = useTheme();
  const menuState = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] =
    React.useState<HTMLButtonElement | null>(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleDrawerOpen = () => dispatch(openMenu());
  const handleDrawerClose = () => dispatch(closeMenu());

  return (
    <Box sx={{ display: 'flex' }}>
      <MenuToolbar
        open={menuState.open}
        drawerWidth={drawerWidth}
        handleCloseUserMenu={handleCloseUserMenu}
        handleDrawerOpen={handleDrawerOpen}
        handleOpenUserMenu={handleOpenUserMenu}
        anchorElUser={anchorElUser}
      />
      <DrawerComponent
        open={menuState.open}
        theme={theme}
        handleDrawerClose={handleDrawerClose}
      />
      <p>{menuState.open.toString()}</p>
    </Box>
  );
}

export default MiniDrawer;
