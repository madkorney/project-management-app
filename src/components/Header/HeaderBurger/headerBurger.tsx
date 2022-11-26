import { Box, Divider, Drawer, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import styles from '../header.module.scss';
import { useAppSelector } from 'redux/hooks';
import { HeaderUserButtons, HeaderUserLinks } from '../HeaderButtons';

type BurgerProps = {
  func: { [name: string]: () => void };
};

export const HeaderBurger = ({ func }: BurgerProps) => {
  const { isAuthorized, isOpenUserPage } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (prop: boolean) => {
    setOpen(prop);
  };

  window.addEventListener(
    'orientationchange',
    () => {
      open && setOpen(false);
    },
    false
  );

  window.addEventListener(
    'resize',
    () => {
      open && setOpen(false);
    },
    false
  );
  return (
    <>
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
        <IconButton
          sx={{ mt: 2, ':hover': { color: 'red', background: 'none' } }}
          onClick={() => toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>

        <Divider sx={{ mb: 2 }} />
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
                <HeaderUserLinks onSignIn={func.goSignIn} onSignUp={func.goSignUp} />
              ) : (
                <HeaderUserButtons
                  openUserPage={isOpenUserPage}
                  onClickOut={func.goOut}
                  onClickUser={func.goUserProfile}
                  onGoBoards={func.goBoards}
                />
              )}
            </ul>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
};
