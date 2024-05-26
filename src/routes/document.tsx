import { useMeta } from '../contexts/MetaContext';
import { useData } from '../contexts/DataContext';

import { Section } from './templates';

import styles from '../styles/document.module.css';

export default function Document() {
  const { display } = useMeta();

  const parsed = useData().parsed || null;

  return parsed ? (
    <div className={styles.container}>
      {display.map((s) => (
        <Section key={s.id} sectionId={s.id} />
      ))}
    </div>
  ) : (
    <code>no data</code>
  );
}
