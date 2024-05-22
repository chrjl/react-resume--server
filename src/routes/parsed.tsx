import { useLoaderData } from 'react-router-dom';

import { useData } from '../contexts/DataContext';

export function loader({ params }) {
  return params.sectionId;
}

export default function Parsed() {
  const sectionId = useLoaderData();

  const data = useData();
  const sectionData =
    data?.parsed && data.parsed[sectionId] ? data.parsed[sectionId] : null;

  console.log(sectionData);

  return (
    <div className="container">
      <h1 style={{ textTransform: 'capitalize' }}>{sectionId}</h1>
      <ul className="list-group">
        {sectionData
          ? sectionData.map(
              ({ title, subtitle, note, description, highlights }, i) => (
                <li key={i} className="list-group-item list-group-item-action">
                <>
                  <li>
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
                  </li>
                </>
              )
            )
          : 'no data'}
      </ul>
    </div>
  );
}
