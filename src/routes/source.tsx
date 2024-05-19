import { Form } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  const type = formData.get('type');

  switch (type) {
    case 'remote': {
      const url = formData.get('url');
      const text = await fetch(url);
      const data = await text.json();
      break;
    }
    case 'file': {
      const file = formData.get('file');
      const data = JSON.parse(await file.text());
      break;
    }
    default:
      throw new Error(
        `Error at DataUploader: I don't know how to handle source type ${type}`
      );
  }

  return true;
}

export default function DataUploader() {
  return (
    <div className="container">
      <h1>Data uploader</h1>

      <Form method="post" encType="multipart/form-data">
        <fieldset className="form-check">
          <input
            type="radio"
            name="type"
            id="sourceTypeRemote"
            value="remote"
            className="form-check-input"
          />
          <label htmlFor="sourceTypeRemote" className="form-label">
            Fetch remote source
          </label>
          <input type="text" name="url" className="form-control" />
        </fieldset>

        <fieldset className="form-check">
          <input
            type="radio"
            name="type"
            id="sourceTypeFile"
            value="file"
            className="form-check-input"
          />
          <label htmlFor="sourceTypeFile">Upload local file</label>
          <input type="file" name="file" className="form-control" />
        </fieldset>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </Form>
    </div>
  );
}
