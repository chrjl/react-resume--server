import { useParams } from 'react-router-dom';
import templates from '@reactresume/template';

import { ResumeObject } from '@reactresume/types';

import { useData } from '../contexts/DataContext';

import styles from '../styles/document.module.css';

export function Section({ sectionId }: { sectionId: string }) {
  const parsed = useData().parsed || null;
  const sectionData = parsed ? parsed[sectionId as keyof ResumeObject] : null;

  const Template = templates.find((t) => t.id === sectionId)?.Component;

  return sectionData ? (
    <section className={styles[sectionId]}>
      <Template data={sectionData} />
    </section>
  ) : null;
}

export default function Template() {
  const { sectionId } = useParams();

  const parsed = useData().parsed || null;
  const sectionData = parsed ? parsed[sectionId as keyof ResumeObject] : null;

  const Template = templates.find((t) => t.id === sectionId)?.Component;

  if (!sectionId || !sectionData) {
    return <code>no data</code>;
  }

  if (!Template) {
    return <code>no template</code>;
  }

  return (
    <div className={styles.container}>
      <Section sectionId={sectionId} />
    </div>
  );
}
