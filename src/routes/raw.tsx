import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

import { useData } from '../contexts/DataContext';

export default function Raw() {
  const data = useData();

  return <JSONPretty data={data.raw} />;
}
