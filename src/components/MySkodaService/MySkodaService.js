import './MySkodaService.css';
import React from 'react';
import { Card, Col } from 'react-bootstrap';

class MySkodaService extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div class="c-myskoda-service">
        <h1 className="display-4 myskoda-title">Vehicle Service</h1>
        <Col className="column" xs={12} md={4}>
              <p class="text-green">Common Skoda Service</p>
              <Card className="mb-4" style={{ width: '397px' }}>
                <Card.Body>
                  <p className="text-regular">Inspection Before Annual Vehicle Licensing Test</p>
                  <p className="text-regular text-bg">your last annual vehicle licensing test: <strong>14/02/2019</strong></p>
                  <strong>Recommended</strong>
                    <p className="text-regular">See your service calendar</p>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: '397px'}}>
                <Card.Body>
                  <p className="text-regular">Multi-Point Inspection</p>
                  <p className="text-regular text-bg">your last multi-point inspection: <strong>12/07/2020</strong></p>
                  <span className="text-small">Full Synthetic Oil Change</span>
                  <span className="text-small">Tire Rotation</span>
                  <span className="text-small">Windshield Wiper Replacement</span>
                  <span className="text-small">Four-Wheel Alignment</span>
                  <strong>Recommended</strong>
                  <p className="text-regular">Every 10,000 Miles or Once a Year </p>
                </Card.Body>
              </Card>
               <Card className="mb-4" style={{ width: '397px' }}>
                <Card.Body>
                  <p className="text-regular">Get your vehicle winter/summer ready</p>
                  <span className="text-small">Winter Inspection</span>
                  <span className="text-small">Summer Inspection</span>
                  <strong>Recommended</strong>
                  <p className="text-regular">Every May and November of every year</p>
                </Card.Body>
              </Card>
              <Card className="mb-4" style={{ width: '397px' }}>
                <Card.Body>
                  <p className="text-regular">Full Service</p>
                  <span className="text-small">Battery Replacement Service</span>
                  <span className="text-small">Brake Pad Replacement Service</span>
                  <span className="text-small">Transmission Fluid Exchange Service</span>
                  <strong>Recommended</strong>
                    <p className="text-regular">Every three years or 30,000 Miles </p>
                </Card.Body>
              </Card>
        </Col>
      </div>
    )
  }
}
export default MySkodaService;