import { Button } from '@mui/material';
import styles from 'global-styles/authorization.module.scss';

type ButtonProps = {
  userPage?: boolean;
  formName: string;
};

export const ButtonsForm = ({ userPage, formName }: ButtonProps) => {
  return userPage ? (
    <>
      <Button className={styles.formButton} variant="contained" type="submit">
        {formName}
      </Button>
      <Button className={styles.formButton} variant="contained" type="submit">
        {formName}
      </Button>
    </>
  ) : (
    <Button className={styles.formButton} variant="contained" type="submit">
      {formName}
    </Button>
  );
};
