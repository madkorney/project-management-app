import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logOut, setOpenUserPage } from 'redux/authSlice';

import { HeaderUserButtons, HeaderUserLinks } from './HeaderButtons';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Paper, Box, Drawer } from '@mui/material';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isOpenUserPage } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (prop: boolean) => {
    setOpen(prop);
  };

  const goOut = () => {
    dispatch(setOpenUserPage(false));
    localStorage.removeItem('pma_token');
    dispatch(logOut());
    navigate('/');
  };

  const goUserProfile = () => {
    navigate('/user-page');
    dispatch(setOpenUserPage(true));
  };

  const goBoards = () => {
    navigate('/boards');
    dispatch(setOpenUserPage(false));
  };

  const goSignIn = () => {
    navigate('/sign-in');
  };

  const goSignUp = () => {
    navigate('/sign-up');
  };

  useEffect(() => {
    location.pathname.includes('user-page') && dispatch(setOpenUserPage(true));
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <p>Header - Nav - Profile</p>
        <nav className={styles.headerNav}>
          <ul className={!isAuthorized ? styles.headerNav : styles.headerNavUser}>
            {!isAuthorized ? (
              <HeaderUserLinks onSignIn={goSignIn} onSignUp={goSignUp} />
            ) : (
              <HeaderUserButtons
                openUserPage={isOpenUserPage}
                onClickOut={goOut}
                onClickUser={goUserProfile}
                onGoBoards={goBoards}
              />
            )}
          </ul>
        </nav>
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={() => toggleDrawer(!open)}
          sx={{
            mr: '5px',
            display: {
              xs: 'flex',
              md: 'none',
            },
            alignItems: 'center',
            width: '45px',
            height: '45px',
            padding: '1px',
          }}
        >
          <MenuIcon
            sx={{
              fill: 'blue',
              width: '90%',
              height: '80%',
              padding: '3px',
            }}
          />
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => toggleDrawer(false)}
          sx={{ width: '500px' }}
          keepMounted
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Paper
              sx={{
                pt: '50px',
                width: '320px',
                height: '100%',
              }}
            >
              <ul className={styles.headerNavAdaptive} onClick={() => toggleDrawer(false)}>
                {!isAuthorized ? (
                  <HeaderUserLinks onSignIn={goSignIn} onSignUp={goSignUp} />
                ) : (
                  <HeaderUserButtons
                    openUserPage={isOpenUserPage}
                    onClickOut={goOut}
                    onClickUser={goUserProfile}
                    onGoBoards={goBoards}
                  />
                )}
              </ul>
            </Paper>
          </Box>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
