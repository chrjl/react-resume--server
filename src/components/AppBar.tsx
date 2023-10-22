import { AppContextType } from '../contexts/AppContext';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function AppBar({ setAppContext }: AppBarProps) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;

          try {
            // update source
            switch (form.source.value) {
              case 'url':
                setAppContext((prevAppContext) => ({
                  ...prevAppContext,
                  source: 'url',
                  path: form.url.value,
                }));
                break;

              case 'file':
                setAppContext((prevAppContext) => ({
                  ...prevAppContext,
                  source: 'file',
                  path: form.file.files[0]?.name,
                }));
                break;

              default:
                break;
            }

            // update format
            setAppContext((prevAppContext) => ({
              ...prevAppContext,
              format: form.format.value,
            }));
          } catch (e) {
            alert('error!');
            throw e;
          }
        }}
      >
        <h1>DATA SOURCE</h1>
        <fieldset id="format-container">
          <legend>Format:</legend>
          <label>
            <input type="radio" name="format" value="json" defaultChecked />
            JSON resume
          </label>
          <label>
            <input type="radio" name="format" value="markdown" disabled />
            Markdown
          </label>
        </fieldset>

        <fieldset id="source-container">
          <legend>Source:</legend>
          <label>
            <input type="radio" name="source" value="url" defaultChecked />
            URL
            <input type="text" id="url" />
          </label>

          <br />

          <label>
            <input type="radio" name="source" value="file" />
            File
            <input type="file" id="file" />
          </label>
        </fieldset>

        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </form>
    </>
  );
}
