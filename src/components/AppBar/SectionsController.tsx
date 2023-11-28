import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../../contexts/AppContext';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function SectionsController({ setAppContext }: AppBarProps) {
  const { components, control } = useContext(AppContext);

  return (
    <form>
      <h1>Sections</h1>
      <ul>
        {components.map(({ id }) => (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                value={id}
                checked={!control[id].hidden}
                onChange={handleChange}
              />
              {id}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );

  function handleChange(e: React.FormEvent) {
    const { value, checked } = e.target as HTMLInputElement;

    const updatedControl = {
      ...control,
      [value]: { hidden: !checked },
    };

    setAppContext((appContext) => ({
      ...appContext,
      control: updatedControl,
    }));
  }
}
