import { AppContextType } from '../../contexts/AppContext';

import DataSourceController from './DataSourceController';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function AppBar({ setAppContext }: AppBarProps) {
  return (
    <div>
      <DataSourceController setAppContext={setAppContext} />
      <div>sections</div>
      <div>paper size</div>
      <div>icons</div>
    </div>
  );
}
