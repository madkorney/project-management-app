import { Link } from 'react-router-dom';
import AnchorLink from '@mui/material/Link';
import './footer.scss';

// import './style.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-container">
      <div className="github">
        <AnchorLink
          className="link github__madkorney"
          href="https://github.com/madkorney"
          target="_blank"
          rel="noopener noreferrer"
          title="madkorney GitHub"
        ></AnchorLink>
        <AnchorLink
          className="link github__kornull"
          href="https://github.com/Kornull"
          target="_blank"
          rel="noopener noreferrer"
          title="Kornull GitHub"
        ></AnchorLink>
        <AnchorLink
          className="link github__sylarbrest"
          href="https://github.com/sylarBrest"
          target="_blank"
          rel="noopener noreferrer"
          title="sylarBrest GitHub"
        ></AnchorLink>
      </div>
      <div className="copyright">
        <Link to="/about">
          <span>©</span>
          <span> 2022 </span>
          <span>Team 7</span>
        </Link>
      </div>
      <div className="rss-logo">
        <a
          href="https://rs.school/react"
          target="_blank"
          rel="noopener noreferrer"
          title="Rolling Scope School"
        ></a>
      </div>
    </div>
  </footer>
);

export default Footer;
