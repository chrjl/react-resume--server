import { useRef } from 'react';
import templates from '@reactresume/template';

import { useData } from '../contexts/DataContext';
import { useMeta } from '../contexts/MetaContext';

export default function SectionSelector() {
  const { parsed } = useData();
  const { display } = useMeta();
  const inputRefs = useRef([]);

  // generate list of sections and order
  const templateSectionList = templates.map((t) => t.id) || [];
  const parsedSectionList = parsed ? Object.keys(parsed) : [];

  return (
    <div className="container">
      <h1 className="h1">Section selector</h1>
      <form id="section-selector">
        {templateSectionList.map((id, idx) => (
          <fieldset key={id} className="mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${id}`}
              name={id}
              disabled={!parsedSectionList.includes(id)}
              defaultChecked={display.find((s) => s.id === id).visible}
              ref={(c) => (inputRefs.current[idx] = c)}
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
      </form>
    </div>
  );

  function handleSelectAll() {
    inputRefs.current.forEach(
      (r) => (r.checked = !r.disabled ? true : r.checked)
    );
  }
}
