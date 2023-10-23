import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface DebugAreaProps {
  title: string;
  text?: string;
  contextKey?: string;
}

export default function DebugArea({ title, contextKey, text }: DebugAreaProps) {
  const appContext = useContext(AppContext);

  return (
    <>
      <div style={{ border: 'solid' }}>
        <h1 style={{ textAlign: 'center', fontFamily: 'monospace' }}>
          {title}
        </h1>
        <textarea
          value={
            contextKey ? JSON.stringify(appContext[contextKey], null, 2) : text
          }
          style={{ width: '100%' }}
          rows={20}
          readOnly
        ></textarea>
      </div>
    </>
  );
}
