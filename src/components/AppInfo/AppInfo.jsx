import React from 'react';
import { Alert } from 'react-bootstrap';
import './AppInfo.css';

const AppInfo = () => {
  return (
    <Alert variant="success" className="c-app-info col-12">
            <p>
              This application based on{" "}
              <a
                href="https://data.gov.il/dataset/private-and-commercial-vehicles/resource/053cea08-09bc-40ec-8f7a-156f0677aff3?view_id=6e5c660c-9103-4297-a6f6-33824258da50"
                target="_blank"
                rel="noreferrer"
              >
                Israel Government Open Data
              </a>
            </p>
            <p>Use one of the following accounts to login:</p>
            <div className="accounts-list">
              <ul className="account-list">
                <li>Try first:</li>
                <li>
                  <small>email:</small>
                  <br />
                  skoda111@gmail.com
                </li>
                <li>
                  <small>password:</small>
                  <br />
                  skoda111
                </li>
              </ul>
              <ul className="account-list">
                <li>Try second:</li>
                <li>
                  <small>email:</small>
                  <br />
                  skoda222@gmail.com
                </li>
                <li>
                  <small>password:</small>
                  <br />
                  skoda222
                </li>
              </ul>
            </div>
            <p>
              Or <a href="/#/signup-step-one">signin</a> with your Skoda.
            </p>
          </Alert>
  );
}

export default AppInfo;
