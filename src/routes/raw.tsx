import { useLoaderData } from 'react-router-dom';

import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { useData } from '../contexts/DataContext';

export function loader({ params }) {
  return params.sectionId;
}

export default function Raw() {
  const data = useData();
  const sectionId = useLoaderData();

  const view = data.raw
    ? sectionId
      ? { [sectionId]: data.raw[sectionId] }
      : data.raw
    : 'no data';

  return (
    <div className="container">
      <code>
        <JsonView data={view} clickToExpandNode={true} />
      </code>
    </div>
  );
}
