import { Link } from 'react-router-dom';
import GithubLink from './GithubLink';
import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-container">
      <div className="github">
        <GithubLink name="madkorney" />
        <GithubLink name="Kornull" />
        <GithubLink name="sylarBrest" />
      </div>
      <Link to="/about" className="copyright">
        <span>©</span>
        <span> 2022 </span>
        <span>Team 7</span>
      </Link>
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
