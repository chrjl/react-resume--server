import { useLoaderData } from 'react-router-dom';
import { ResumeEntry } from '../../packages/types/dist';

import { useData } from '../contexts/DataContext';

export function loader({ params }) {
  return params.sectionId;
}

export default function Parsed() {
  const sectionId = useLoaderData();

  const data = useData();
  const entries: ResumeEntry[] | null =
    data?.parsed && data.parsed[sectionId] ? data.parsed[sectionId] : null;

  return (
    <div className="container">
      <h1 style={{ textTransform: 'capitalize' }}>{sectionId}</h1>
      <ul className="list-group">
        {entries
          ? entries.map(
              ({ title, subtitle, note, description, highlights }, i) => (
                <li key={i} className="list-group-item list-group-item-action">
                  <ResumeEntryDetail
                    title={title}
                    subtitle={subtitle}
                    note={note}
                    description={description}
                    highlights={highlights}
                  />
                </li>
              )
            )
          : 'no data'}
      </ul>
    </div>
  );
}

interface ResumeEntryDetailProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  note: React.ReactNode;
  description: React.ReactNode;
  highlights: React.ReactNode;
}

function ResumeEntryDetail({
  title,
  subtitle,
  note,
  description,
  highlights,
}: ResumeEntryDetailProps) {
  return (
    <dl>
      {title && (
        <>
          <dt>Title</dt>
          <dd>{title}</dd>
        </>
      )}

      {subtitle && (
        <>
          <dt>Subtitle</dt>
          <dd>{subtitle}</dd>
        </>
      )}

      {note && (
        <>
          <dt>Note</dt>
          <dd>{note}</dd>
        </>
      )}

      {description && (
        <>
          <dt>Description</dt>
          <dd>{description}</dd>
        </>
      )}

      {highlights && (
        <>
          <dt>Highlights</dt>
          <dd>{highlights}</dd>
        </>
      )}
    </dl>
  );
}
