import './ServiceCalendar.css';
import React from 'react';
import { Card, Col, ListGroup } from 'react-bootstrap';

class ServiceCalendar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
     <div class="c-myskoda-service">
        <h1 className="display-4 myskoda-title">Service Calendar</h1>
        <Col className="column" xs={12} md={4}>
              <p class="text-regular">Keep Your Skoda At Its Best with Our Service</p>
              <span className="text-small">Scheduled maintenance can saving you lots in the long run</span>
              <p class="text-green">Common Skoda Service</p>
              <Card className="mb-4" style={{ width: '397px' }}>
                <Card.Body>
                  <p className="text-regular">Inspection Before Annual Vehicle Licensing Test</p>
                  <p className="text-regular text-bg">your last annual vehicle licensing test: <strong>14/02/2019</strong></p>
                  <strong>Recommended</strong>
                    <p className="text-regular">See your service schedule <a className="login-link" href="#shedule">here</a></p>
                </Card.Body>
              </Card>
              

<table style={{ width: '397px' }} className="table-primary">
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-secondary" style={{ width: '397px' }}>
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-success" style={{ width: '397px' }}>
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-danger" style={{ width: '397px' }}>
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-warning" style={{ width: '397px' }}>
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-info" style={{ width: '397px' }}>
  <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
</table>
<table className="table-light" style={{ width: '397px' }}><tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    </table>
<table className="table-dark" style={{ width: '397px' }}><tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    </table>
        </Col>
      </div>
    )
  }
}
export default ServiceCalendar;