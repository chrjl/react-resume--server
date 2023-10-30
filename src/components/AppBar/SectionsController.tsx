import React, { useContext } from 'react';
import { AppContext, AppContextType } from '../../contexts/AppContext';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function SectionsController({ setAppContext }: AppBarProps) {
  const { components } = useContext(AppContext);

  return (
    <form onChange={handleChange}>
      <h1>Sections</h1>
      <ul>
        {components.map(({ id, available }, index) => (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                value={index}
                disabled={!available}
                defaultChecked={available}
              />
              {id}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );

  function handleChange(e: React.FormEvent) {
    const { value } = e.target as HTMLInputElement;
    const index = +value;

    if (!Number.isInteger(index)) {
      console.error('error in SectionsController change event handler');
      return;
    }

    // toggle the 'hidden' attribute of the selected component
    components[index] = {
      ...components[index],
      hidden: !components[index].hidden,
    };

    setAppContext((appContext) => ({
      ...appContext,
      components,
    }));
  }
}
