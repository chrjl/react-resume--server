import { NavLink, Outlet } from 'react-router-dom';
import 'bootstrap';

import { useData, useDataDispatch } from '../contexts/DataContext';
import { useMeta } from '../contexts/MetaContext';

import githubMark from '../assets/github-mark-white.svg';

export default function Root() {
  const { raw, parsed } = useData();
  const dataDispatch = useDataDispatch();

  const { source } = useMeta();
  const isRemoteSource = source.type === 'remote';

  return (
    <>
      <nav className="navbar navbar-dark sticky-top navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/status" className="nav-link">
                Status
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/source" className="nav-link">
                Source
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/control" className="nav-link">
                Control
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${parsed ? '' : 'disabled'}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Raw
              </a>
              <ul className="dropdown-menu">
                {raw && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/raw" end className="dropdown-item">
                        ALL
                      </NavLink>
                    </li>
                    <hr />
                    {Object.keys(raw).map((sectionId) => (
                      <li key={sectionId} className="nav-item">
                        <NavLink
                          className="dropdown-item"
                          to={`/raw/${sectionId}`}
                        >
                          {sectionId}
                        </NavLink>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${parsed ? '' : 'disabled'}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Parsed
              </a>
              <ul className="dropdown-menu">
                {parsed &&
                  Object.keys(parsed).map((sectionId) => (
                    <li key={sectionId} className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        to={`/parsed/${sectionId}`}
                      >
                        {sectionId}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${parsed ? '' : 'disabled'}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Templates
              </a>
              <ul className="dropdown-menu">
                {parsed &&
                  Object.keys(parsed).map((sectionId) => (
                    <li key={sectionId} className="nav-item">
                      <NavLink
                        className="dropdown-item"
                        to={`/templates/${sectionId}`}
                      >
                        {sectionId}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink
                to="/document"
                className={`nav-link ${parsed ? '' : 'disabled'}`}
              >
                Document
              </NavLink>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={`btn btn-sm btn-outline-light ${isRemoteSource ? '' : 'disabled'}`}
                onClick={() => handleRemoteSourceReload(source.url)}
              >
                ⟳
              </button>
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

  async function handleRemoteSourceReload(url: string) {
    const text = await fetch(url);
    const data = await text.json();

    dataDispatch({ type: 'UPDATE', raw: data });
  }
}
