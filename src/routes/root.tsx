import { Link, Outlet } from 'react-router-dom';

import githubMark from '../assets/github-mark-white.svg';

export default function Root() {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="navbar-brand">
              <a
                target="_blank"
                href="https://github.com/chrjl/reactresume--server"
              >
                <img
                  height="24"
                  src={githubMark}
                  alt="github"
                  className="align-text-top"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
