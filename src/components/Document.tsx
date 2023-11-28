import { useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

export default function Document() {
  const appContext = useContext(AppContext);
  const { components, control } = appContext;

  return components.map(
    ({ id, component }) =>
      !control[id].hidden && (
        <section key={id} id={id}>
          {component}
        </section>
      )
  );
}
