import { useContext } from 'react';

import { AppContext, AppContextType } from '../contexts/AppContext';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function AppBar({ setAppContext }: AppBarProps) {
  const appContext = useContext(AppContext);

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>DATA SOURCE</h1>
        <fieldset
          id="format"
          onChange={(e) => {
            const { name, value } = e.target as HTMLInputElement;
            if (name !== 'format') return;

            setAppContext((prevAppContext) => ({
              ...prevAppContext,
              format: value,
            }));
          }}
        >
          <legend>Format:</legend>
          <label>
            <input type="radio" name="format" value="json" defaultChecked />
            JSON resume
          </label>
          <label>
            <input type="radio" name="format" value="markdown" />
            Markdown
          </label>
        </fieldset>

        <fieldset
          id="source"
          onChange={(e) => {
            const { name, value } = e.target as HTMLInputElement;
            if (name !== 'source') return;

            setAppContext((prevAppContext) => ({
              ...prevAppContext,
              source: value,
            }));
          }}
        >
          <legend>Source:</legend>
          <label>
            <input type="radio" name="source" value="url" defaultChecked />
            URL
            <input type="text" />
          </label>

          <br />

          <label>
            <input type="radio" name="source" value="file" />
            File
            <input type="file" />
          </label>
        </fieldset>
      </form>
    </>
  );
}
