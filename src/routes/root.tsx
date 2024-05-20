import { NavLink, Outlet } from 'react-router-dom';

import githubMark from '../assets/github-mark-white.svg';

export default function Root() {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/source" className="nav-link">
                Source
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/raw" className="nav-link">
                Raw
              </NavLink>
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
