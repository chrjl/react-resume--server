import { useRef } from 'react';
import { Form, redirect } from 'react-router-dom';
import templates from '@reactresume/template';

import { useData } from '../contexts/DataContext';
import { useMeta } from '../contexts/MetaContext';

export function action({ metaDispatch }) {
  return async function ({ request }) {
    const formData = await request.formData();
    const statusEntries: [string, string][] = Array.from(formData);

    const display = statusEntries.map(([s, _]) => ({
      id: s,
      visible: true,
    }));

    metaDispatch({ type: 'UPDATE_SECTIONS', display });
    return redirect('/document');
  };
}

export default function SectionSelector() {
  const { parsed } = useData();
  const { display } = useMeta();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // generate list of sections and order
  const templateSectionList = templates.map((t) => t.id) || [];
  const parsedSectionList = parsed ? Object.keys(parsed) : [];

  return (
    <div className="container">
      <h1 className="h1">Section selector</h1>
      <Form id="section-selector" method="post">
        {templateSectionList.map((id, idx) => (
          <fieldset key={id} className="mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${id}`}
              name={id}
              disabled={!parsedSectionList.includes(id)}
              defaultChecked={display.find((s) => s.id === id)?.visible}
              ref={(c) => (inputRefs.current[idx] = c as HTMLInputElement)}
            />{' '}
            <label htmlFor={`checkbox-${id}`} className="form-check-label">
              {id}
            </label>
          </fieldset>
        ))}

        <div className="mt-4 btn-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSelectAll}
          >
            Select all
          </button>
          <button type="reset" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </Form>
    </div>
  );

  function handleSelectAll() {
    inputRefs.current.forEach(
      (r) => (r.checked = !r.disabled ? true : r.checked)
    );
  }
}
