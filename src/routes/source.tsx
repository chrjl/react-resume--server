import { useRef } from 'react';
import { Form, redirect } from 'react-router-dom';
import { useMeta } from '../contexts/MetaContext';

export function action({ metaDispatch, dataDispatch }) {
  return async function ({ request }) {
    const formData = await request.formData();
    const type = formData.get('type');

    switch (type) {
      case 'remote': {
        const url = formData.get('url');
        const text = await fetch(url);
        const data = await text.json();

        metaDispatch({
          type: 'UPDATE_SOURCE',
          source: { type: 'remote', url },
        });

        dataDispatch({
          type: 'UPDATE',
          raw: data,
        });
        break;
      }
      case 'file': {
        const file = formData.get('file');
        const data = JSON.parse(await file.text());

        metaDispatch({
          type: 'UPDATE_SOURCE',
          source: { type: 'file', fileName: file.name },
        });

        dataDispatch({
          type: 'UPDATE',
          raw: data,
        });
        break;
      }
      default:
        throw new Error(
          `Error at DataUploader: I don't know how to handle source type ${type}`
        );
    }

    return redirect('/raw');
  };
}

export default function DataUploader() {
  const meta = useMeta();
  const urlRadioRef = useRef(null);
  const urlInputRef = useRef(null);
  const fileRadioRef = useRef(null);
  const fileInputRef = useRef(null);
  // set default values if source has not yet been loaded
  const sourceType = meta.source.type || 'remote';
  const sourceUrl =
    (!meta.source.type && 'sample.json') ||
    (meta.source.type === 'remote' && meta.source.url) ||
    '';

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
            defaultChecked={sourceType === 'remote'}
            ref={urlRadioRef}
            onInput={() => urlInputRef.current.focus()}
          />
          <label htmlFor="sourceTypeRemote" className="form-label">
            Fetch remote source
          </label>
          <input
            type="text"
            name="url"
            className="form-control"
            defaultValue={sourceUrl}
            ref={urlInputRef}
            onFocus={() => (urlRadioRef.current.checked = true)}
          />
        </fieldset>

        <fieldset className="form-check">
          <input
            type="radio"
            name="type"
            id="sourceTypeFile"
            value="file"
            className="form-check-input"
            defaultChecked={sourceType === 'file'}
            ref={fileRadioRef}
            onInput={() => fileInputRef.current.focus()}
          />
          <label htmlFor="sourceTypeFile">Upload local file</label>
          <input
            type="file"
            name="file"
            className="form-control"
            ref={fileInputRef}
            onFocus={() => (fileRadioRef.current.checked = true)}
          />
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
