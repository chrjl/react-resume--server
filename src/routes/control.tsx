import { useState, useRef } from 'react';
import { Form, redirect } from 'react-router-dom';
import templates from '@reactresume/template';

import { useData } from '../contexts/DataContext';
import { useMeta, Action as MetaAction } from '../contexts/MetaContext';

interface actionArgs {
  metaDispatch: React.Dispatch<MetaAction>;
}

export function action({ metaDispatch }: actionArgs) {
  return async function ({ request }: { request: Request }) {
    const formData = await request.formData();
    const statusEntries: [string, FormDataEntryValue][] = Array.from(formData);

    const display = statusEntries.map(([s, _], idx) => ({
      id: s,
      visible: true,
      order: idx,
    }));

    metaDispatch({ type: 'UPDATE_SECTIONS', display });
    return redirect('/document');
  };
}

export default function SectionSelector() {
  const { parsed } = useData();
  const { display } = useMeta();

  // generate list of sections and set order if display is set
  const templateSectionList = templates.map((t) => t.id) || [];
  const parsedSectionList = parsed ? Object.keys(parsed) : [];

  templateSectionList.sort(
    (a, b) =>
      display.find((s) => s.id === a)?.order -
      display.find((s) => s.id === b)?.order
  );

  const [sections, setSections] = useState(templateSectionList);

  // input elements will be assigned to elements of this ref array
  const inputRefs = useRef<HTMLInputElement[]>([]);

  return (
    <div className="container">
      <h1 className="h1">Section selector</h1>

      <Form id="section-selector" method="post">
        <table className="table d-inline-block">
          <thead>
            <tr>
              <th className="text-center">Display</th>
              <th className="text-center pl-4">Reorder</th>
              <th>Section</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {sections.map((id, idx) => (
              <tr key={id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkbox-${id}`}
                    name={id}
                    disabled={!parsedSectionList.includes(id)}
                    defaultChecked={display.find((s) => s.id === id)?.visible}
                    ref={(c) =>
                      (inputRefs.current[idx] = c as HTMLInputElement)
                    }
                  />
                </td>

                <td className="btn-group text-center">
                  <button
                    type="button"
                    className={`btn btn-outline-primary btn-sm ${idx === 0 && 'disabled'}`}
                    onClick={() => handleDecrementIndex(idx)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-primary btn-sm ${idx === sections.length - 1 && 'disabled'}`}
                    onClick={() => handleDecrementIndex(idx + 1)}
                  >
                    ↓
                  </button>
                </td>

                <td>
                  <label
                    htmlFor={`checkbox-${id}`}
                    className="form-check-label"
                  >
                    {id}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleDeselectAll}
          >
            Deselect all
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

  function handleDeselectAll() {
    inputRefs.current.forEach((r) => (r.checked = false));
  }

  function handleDecrementIndex(idx: number) {
    if (idx === 0) return;

    setSections([
      ...sections.slice(0, idx - 1),
      sections[idx],
      sections[idx - 1],
      ...sections.slice(idx + 1),
    ]);
  }
}
