import { useContext } from 'react';

import sections from 'template';
import { AppContext } from '../contexts/AppContext';

export default function Document() {
  const appContext = useContext(AppContext);
  const { resume } = appContext;

  return sections.map(({ id, Component }) =>
    // type guard data sent to template component props
    id in resume && resume[id] ? (
      <section key={id} id={id}>
        <Component data={resume[id]} />
      </section>
    ) : null
  );
}
