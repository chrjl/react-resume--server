import { useParams } from 'react-router-dom';
import { JSONResumeObject } from '@reactresume/types';

import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { useData } from '../contexts/DataContext';

export default function Raw() {
  const data = useData();
  const { sectionId } = useParams();

  const view = data.raw
    ? sectionId
      ? { [sectionId]: data.raw[sectionId as keyof JSONResumeObject] }
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
