import React from 'react';

import { AppContextType } from '../../contexts/AppContext';
import parser from '@reactresume/jsonresume-parser';
import sections from '@reactresume/template';

interface AppBarProps {
  setAppContext: React.Dispatch<React.SetStateAction<AppContextType>>;
}

export default function DataSourceController({ setAppContext }: AppBarProps) {
  return (
    <form onSubmit={handleSubmit}>
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
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    try {
      let jsonresume: object;

      // update source
      switch (form.source.value) {
        case 'url': {
          const url = form.url.value;

          const text = await fetch(url);
          jsonresume = await text.json();

          setAppContext((appContext) => ({
            ...appContext,
            source: 'url',
            path: url,
          }));

          break;
        }

        case 'file': {
          const file: File = form.file.files[0];

          const text = await file.text();
          jsonresume = JSON.parse(text);

          setAppContext((appContext) => ({
            ...appContext,
            source: 'file',
            path: file.name,
          }));

          break;
        }

        default:
          return;
      }

      const parsed = parser(jsonresume);

      // update context after successfully receiving and parsing data
      setAppContext((appContext) => ({
        ...appContext,
        data: {
          jsonresume,
          parsed,
        },
        components: sections.map(({ id, Component }) => ({
          id,
          available: Boolean(id in parsed && parsed[id]),
          component: parsed[id] ? <Component data={parsed[id]} /> : null,
        })),
        format: form.format.value,
      }));
    } catch (e) {
      alert('error!');
      throw e;
    }
  }
}
