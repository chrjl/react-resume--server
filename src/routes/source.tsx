import { useRef } from 'react';
import { Form, redirect } from 'react-router-dom';
import YAML from 'yaml';
import { useMeta, Action as MetaAction } from '../contexts/MetaContext';
import { Action as DataAction } from '../contexts/DataContext';

interface actionArgs {
  metaDispatch: React.Dispatch<MetaAction>;
  dataDispatch: React.Dispatch<DataAction>;
}

export function action({ metaDispatch, dataDispatch }: actionArgs) {
  return async function ({ request }: { request: Request }) {
    const formData = await request.formData();
    const type = formData.get('type');

    switch (type) {
      case 'remote': {
        const url = formData.get('url') as string;
        const response = await fetch(url);
        const text = await response.text();
        const data = parseData(text);

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
        const file = formData.get('file') as File;

        if (!file) break;

        const text = await file.text();
        const data = parseData(text);

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

    return redirect('/control');
  };

  function parseData(text: string) {
    try {
      return JSON.parse(text);
    } catch {}

    try {
      return YAML.parse(text);
    } catch {}

    throw new Error('Invalid data (must be either YAML or JSON)');
  }
}

export default function DataUploader() {
  const meta = useMeta();
  const urlRadioRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const fileRadioRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // set default values if source has not yet been loaded
  const sourceType = meta.source.type || 'remote';
  const sourceUrl =
    (!meta.source.type && 'sample.json') ||
    (meta.source.type === 'remote' && meta.source.url) ||
    '';

  return (
    <div className="container">
      <h1 className="h1">Data uploader</h1>

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
            onInput={() => urlInputRef.current!.focus()}
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
            onFocus={() => (urlRadioRef.current!.checked = true)}
          />
        </fieldset>

        <fieldset className="form-check mt-2">
          <input
            type="radio"
            name="type"
            id="sourceTypeFile"
            value="file"
            className="form-check-input"
            defaultChecked={sourceType === 'file'}
            ref={fileRadioRef}
            onInput={() => fileInputRef.current!.focus()}
          />
          <label htmlFor="sourceTypeFile">Upload local file</label>
          <input
            type="file"
            name="file"
            className="form-control"
            ref={fileInputRef}
            onFocus={() => (fileRadioRef.current!.checked = true)}
          />
        </fieldset>

        <div className="mt-4 btn-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="reset" className="btn btn-outline-secondary">
            Reset
          </button>
        </div>
      </Form>
    </div>
  );
}
