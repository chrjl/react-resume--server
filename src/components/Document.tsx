import { useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

export default function Document() {
  const appContext = useContext(AppContext);
  const { components } = appContext;

  return components.map(
    ({ id, available, hidden, component }) =>
      available &&
      !hidden && (
        <section key={id} id={id}>
          {component}
        </section>
      )
  );
}
