import Link from '@mui/material/Link';
import { GithubLinkPropsType } from 'types';

const GithubLink = ({ name }: GithubLinkPropsType) => (
  <Link
    className={`link github__${name.toLowerCase()}`}
    href={`https://github.com/${name}`}
    target="_blank"
    rel="noopener noreferrer"
    title={`${name} GitHub`}
  ></Link>
);

export default GithubLink;
