import { useState, useRef } from 'react';
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

  // generate list of sections and order
  const templateSectionList = templates.map((t) => t.id) || [];
  const parsedSectionList = parsed ? Object.keys(parsed) : [];

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
                    className="btn btn-outline-primary btn-sm disabled"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm disabled"
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
