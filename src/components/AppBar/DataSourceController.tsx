import React from 'react';

import { AppContextType } from '../../contexts/AppContext';
import parser from '@reactresume/jsonresume-parser';
import templates from '@reactresume/template';

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
          <input type="text" id="url" defaultValue="sample.json" />
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

      // only present sections that exist on both parser and templates
      // warn about sections that only exist on one
      const sections = templates.filter((template) =>
        Object.keys(parsed).includes(template.id)
      );

      const sectionIds = sections.map((section) => section.id);
      const templateIds = templates.map((template) => template.id);

      const templatesOnly = templateIds.filter(
        (id) => !sectionIds.includes(id)
      );
      const dataOnly = Object.keys(parsed).filter(
        (id) => !sectionIds.includes(id)
      );

      templatesOnly.length &&
        console.warn(`[${templatesOnly}] only exists in templates`);
      dataOnly.length &&
        console.warn(`[${dataOnly}] only exists in parsed data`);

      // update context after successfully receiving and parsing data
      setAppContext((appContext) => ({
        ...appContext,
        data: {
          jsonresume,
          parsed,
        },
        components: sections.map(({ id, Component }) => ({
          id,
          component: <Component data={parsed[id]} />,
        })),
        control: Object.fromEntries(
          sections.map(({ id }) => [id, { hidden: false }])
        ),
        format: form.format.value,
      }));
    } catch (e) {
      alert('error!');
      throw e;
    }
  }
}
