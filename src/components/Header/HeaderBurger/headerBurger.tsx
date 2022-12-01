import { Box, Divider, Drawer, IconButton, Paper } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAppSelector } from 'redux/hooks';
import { HeaderUserButtons, HeaderUserLinks } from '../HeaderButtons';

import styles from '../header.module.scss';
import { TFunction } from 'i18next';

type BurgerProps = {
  func: { [name: string]: () => void };
  langClick: () => void;
  buttonLangText: string;
  t: TFunction<'translation', undefined>;
};

export const HeaderBurger = ({ func, ...ask }: BurgerProps) => {
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
              pt: '50px',
              width: '320px',
              height: '100%',
              background: '#1b3c6c',
              borderRadius: 0,
            }}
          >
            {' '}
            <IconButton
              sx={{
                marginLeft: '84%',
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
            <ul className={styles.headerNavAdaptive} onClick={() => toggleDrawer(false)}>
              <Divider sx={{ mb: 2, background: '#fff', width: '100%', height: '2px' }} />
              {!isAuthorized ? (
                <HeaderUserLinks onSignIn={func.goSignIn} onSignUp={func.goSignUp} {...ask} />
              ) : (
                <HeaderUserButtons
                  openUserPage={isOpenUserPage}
                  onClickOut={func.goOut}
                  onClickUser={func.goUserProfile}
                  onGoBoards={func.goBoards}
                  {...ask}
                />
              )}
            </ul>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
};
