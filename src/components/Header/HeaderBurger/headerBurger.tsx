import { useState } from 'react';
import { TFunction } from 'i18next';

import { useAppSelector } from 'redux/hooks';

import { Box, Divider, Drawer, IconButton, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { HeaderUserButtons, HeaderUserLinks } from '../HeaderButtons';

import styles from '../header.module.scss';

type BurgerProps = {
  func: { [name: string]: () => void };
  t: TFunction<'translation', undefined>;
};

export const HeaderBurger = ({ func, t }: BurgerProps) => {
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
          display: {
            xs: 'flex',
            md: 'none',
          },
          alignItems: 'center',
          width: '45px',
          height: '45px',
          padding: '1px',
          mt: '5px',
        }}
      >
        <MenuIcon
          sx={{
            fill: '#fff',
            width: '90%',
            height: '80%',
            padding: '3px',
            transition: 'fill .3s linear',
            ':hover': {
              fill: '#7b98fa',
            },
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
              pt: '10px',
              width: '320px',
              minHeight: '100%',
              background: '#1b3c6c',
              borderRadius: 0,
            }}
          >
            {' '}
            <IconButton
              sx={{
                marginLeft: '80%',
                marginBottom: 1,
                width: '40px',
                height: '40px',
                fontSize: '20px',
                ':hover': { background: 'none' },
              }}
              onClick={() => toggleDrawer(false)}
            >
              <CloseIcon
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  width: '36px',
                  height: '36px',
                  transition: 'color .3s linear',
                  ':hover': { color: '#7b98fa', background: 'none' },
                }}
              />
            </IconButton>
            <Divider sx={{ mb: 2, ml: 3, background: '#fff', width: '82%', height: '2px' }} />
            <ul className={styles.headerNavAdaptive} onClick={() => toggleDrawer(false)}>
              {!isAuthorized ? (
                <HeaderUserLinks onSignIn={func.goSignIn} onSignUp={func.goSignUp} t={t} />
              ) : (
                <HeaderUserButtons
                  openUserPage={isOpenUserPage}
                  onClickOut={func.goOut}
                  onClickUser={func.goUserProfile}
                  onGoBoards={func.goBoards}
                  t={t}
                />
              )}
            </ul>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
};
