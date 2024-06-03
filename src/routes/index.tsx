import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <p className="container">
      <h1 className="h1">Welcome to React Resume</h1>
      <table className="table table-hover d-inline-block">
        <tbody>
          <tr>
            <td className="text-center d-grid">
              <Link to="source" className="btn btn-primary">
                Source
              </Link>
            </td>
            <td className="align-middle">
              Upload or fetch a JSON Resume document (sample available)
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="source" className="btn btn-primary disabled">
                Control
              </Link>
            </td>
            <td className="align-middle">
              Select and order displayed resume sections
              <span>
                <br />
                <em>(unavailable until data is loaded)</em>
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="raw" className="btn btn-secondary disabled">
                Raw
              </Link>
            </td>
            <td className="align-middle">
              Review the uploaded JSON, by section
              <span>
                <br />
                <em>(unavailable until data is loaded)</em>
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="parsed" className="btn btn-secondary disabled">
                Parsed
              </Link>
            </td>
            <td className="align-middle">
              Review the normalized resume data, by section
              <span>
                <br />
                <em>(unavailable until data is loaded)</em>
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="template" className="btn btn-secondary disabled">
                Template
              </Link>
            </td>
            <td className="align-middle">
              Review the individual resume section components
              <span>
                <br />
                <em>(unavailable until data is loaded)</em>
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="document" className="btn btn-success disabled">
                Document
              </Link>
            </td>
            <td className="align-middle">
              View the rendered document
              <span>
                <br />
                <em>(unavailable until data is loaded)</em>
              </span>
            </td>
          </tr>
          <tr>
            <td className="text-center d-grid">
              <Link to="#" className="btn btn-warning disabled">
                Export PDF
              </Link>
            </td>
            <td className="align-middle">
              Not natively implemented
              <br />
              Print to PDF with browser functionality (scale "100%", margins
              "none")
            </td>
          </tr>
        </tbody>
      </table>
    </p>
  );
}
