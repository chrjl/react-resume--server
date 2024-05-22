import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

import { useData } from '../contexts/DataContext';

export default function Raw() {
  const data = useData();

  return (
    <div className="container">
      <code>
        <JsonView data={data.raw} clickToExpandNode={true} />
      </code>
    </div>
  );
}
