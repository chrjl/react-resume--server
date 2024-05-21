import { useMeta } from '../contexts/MetaContext';

export default function Status() {
  const meta = useMeta();

  return (
    <div className="container">
      <h1>App Status</h1>
      <h2 className="mt-4">Source</h2>
      <table className="table table-hover d-inline-block">
        <tbody>
          <tr>
            <th>Source type</th>
            <td>{meta.source.type}</td>
          </tr>
          <tr>
            <th>URL</th>
            <td>{meta.source.url}</td>
          </tr>
          <tr>
            <th>File name</th>
            <td>{meta.source.fileName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
