import { useLoaderData } from 'react-router-dom';
import templates from '@reactresume/template';
import { useData } from '../contexts/DataContext';

export function loader({ params }) {
  return params.sectionId;
}

export default function Template() {
  const sectionId = useLoaderData();
  const data = useData().parsed ? useData().parsed[sectionId] : null;

  const Template = templates.find((t) => t.id === sectionId)?.Component;
  return data ? (
    <Template data={data} />
  ) : (
    <code>no data</code>
  );
}
