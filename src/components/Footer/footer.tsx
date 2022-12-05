import { Typography } from '@mui/material';
import GithubLink from './GithubLink';

import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-container">
      <div className="github">
        <GithubLink name="Kornull" />
        <GithubLink name="sylarBrest" />
      </div>
      <Typography className="copyright">© 2022 Team 7</Typography>
      <a
        className="rss-logo"
        href="https://rs.school/react"
        target="_blank"
        rel="noopener noreferrer"
        title="Rolling Scope School"
      ></a>
    </div>
  </footer>
);

export default Footer;
