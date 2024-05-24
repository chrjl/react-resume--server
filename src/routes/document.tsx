import templates from '@reactresume/template';
import { useMeta } from '../contexts/MetaContext';
import { useData } from '../contexts/DataContext';

import { Section } from './templates';

import styles from '../styles/document.module.css';

export default function Document() {
  const { display } = useMeta();

  const parsed = useData().parsed || null;

  return parsed ? (
    <div className={styles.container}>
      {templates.map(({ id, Component }) =>
        display.find((s) => s.id === id)?.visible ? (
          <Section key={id} sectionId={id} />
        ) : null
      )}
    </div>
  ) : (
    <code>no data</code>
  );
}
