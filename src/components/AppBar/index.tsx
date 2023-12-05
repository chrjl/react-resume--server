import { AppContextType } from '../../contexts/AppContext';
import styles from './AppBar.module.css';

import DataSourceController from './DataSourceController';
import SectionsController from './SectionsController';

import githubMark from '../../components/github-mark-white.svg';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function AppBar({ setAppContext }: AppBarProps) {
  return (
    <div className={styles.container}>
      <DataSourceController setAppContext={setAppContext} />
      <SectionsController setAppContext={setAppContext} />

      <span className={styles.links}>
        <a
          href="https://github.com/chrjl/reactresume"
          target="_blank"
        >
          <img src={githubMark} alt="GitHub" />
        </a>
      </span>
    </div>
  );
}
