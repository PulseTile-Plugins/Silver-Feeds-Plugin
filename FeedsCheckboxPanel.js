import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { getNameFromUrl } from '../../../../utils/rss-helpers';
import PTCustomInput from '../../../pages/PatientsSummary/header/PTCustomInput';

const FeedsCheckboxPanel = ({ feeds, toggleCheckbox }) => {
  if (feeds.length > 0) {
    return (
      <div>
        <div className="heading">FEEDS</div>
          <div className="form-group">
            <Row>
              {feeds.map((item) => {
                const nameItem = getNameFromUrl(item.landingPageUrl);
                const isChecked = ('true' == localStorage.getItem('isShow_'+nameItem));
                return (
                  <Col xs={6} sm={4} key={nameItem}>
                    <PTCustomInput
                      type="checkbox"
                      title={item.name}
                      id={nameItem}
                      name={nameItem}
                      isChecked={isChecked}
                      onChange={toggleCheckbox}
                    />
                  </Col>)
              })}
            </Row>
          </div>
        </div>
      );
    }
    return null;
};

export default FeedsCheckboxPanel;
