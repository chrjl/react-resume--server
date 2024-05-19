import { Link, Outlet } from 'react-router-dom';

import githubMark from '../assets/github-mark.svg';

export default function Root() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/chrjl/reactresume--server"
            >
              <img height="24px" src={githubMark} alt="github" />
            </a>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
