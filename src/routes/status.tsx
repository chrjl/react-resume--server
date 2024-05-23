import { useMeta } from '../contexts/MetaContext';
import { useData } from '../contexts/DataContext';

export default function Status() {
  const meta = useMeta();
  const { raw } = useData();
  const isLoaded = Boolean(raw);

  return (
    <div className="container">
      <h1>App Status</h1>
      <h2 className="mt-4">Source</h2>
      <table className="table table-hover d-inline-block">
        <tbody>
          <tr>
            <th>Data loaded?</th>
            <td>
              <code>{isLoaded.toString()}</code>
            </td>
          </tr>
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

      <h2>Sections</h2>
      <SectionStatus />
    </div>
  );
}

function SectionStatus() {
  const { raw, parsed } = useData();

  if (!raw) {
    return <code>no data</code>
  }

  const sectionList = new Set<string>();

  Object.keys(parsed).forEach((section) => sectionList.add(section));
  Object.keys(raw).forEach((section) => sectionList.add(section));

  return (
    <table className="table d-inline-block">
      <thead>
        <tr>
          <th>Section</th>
          <th>Raw</th>
          <th>Parsed</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(sectionList).map((s) => (
          <tr>
            <th>{s}</th>
            <td>
              <code>{Object.keys(raw).includes(s).toString()}</code>
            </td>
            <td>
              <code>{Object.keys(parsed).includes(s).toString()}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
