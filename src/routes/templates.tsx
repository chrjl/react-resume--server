import { useLoaderData } from 'react-router-dom';
import templates from '@reactresume/template';
import { useData } from '../contexts/DataContext';

import styles from '../styles/document.module.css';

export function loader({ params }) {
  return params.sectionId;
}

export default function Template() {
  const sectionId = useLoaderData();
  const data = useData().parsed ? useData().parsed[sectionId] : null;

  const Template = templates.find((t) => t.id === sectionId)?.Component;
  return data ? (
    <div className={styles.container}>
      <section>
        <div className={styles[sectionId]}>
          <Template data={data} />
        </div>
      </section>
    </div>
  ) : (
    <code>no data</code>
  );
}
