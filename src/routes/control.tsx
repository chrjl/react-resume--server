import templates from '@reactresume/template';

import { useData } from '../contexts/DataContext';
import { useMeta } from '../contexts/MetaContext';

export default function SectionSelector() {
  const { parsed } = useData();
  const { display } = useMeta();

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
