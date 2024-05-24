import templates from '@reactresume/template';

import { useData } from '../contexts/DataContext';
export default function SectionSelector() {
  const { parsed } = useData();

  // generate list of sections and order
  const templateSectionList = templates.map((t) => t.id) || [];
  const parsedSectionList = parsed ? Object.keys(parsed) : [];

  return (
    <div className="container">
      <h1 className="h1">Section selector</h1>
      <form id="section-selector">
        {templateSectionList.map((id) => (
          <fieldset key={id} className="mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id={`checkbox-${id}`}
              disabled={!parsedSectionList.includes(id)}
            />{' '}
            <label htmlFor={`checkbox-${id}`} className="form-check-label">
              {id}
            </label>
          </fieldset>
        ))}

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
