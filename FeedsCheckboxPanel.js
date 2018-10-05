import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col } from 'react-bootstrap';

import { getNameFromUrl } from '../../../../utils/rss-helpers';
import PTCustomInput from '../../../pages/PatientsSummary/header/PTCustomInput';

/**
 * This component returns list of checkboxes for Feeds panels
 *
 * @param {object}   boards
 * @param {function} toggleCheckbox
 * @return {*}
 * @constructor
 */
const FeedsCheckboxPanel = ({ boards, toggleCheckbox }) => {
    const feeds = get(boards, 'feeds.feeds', []);
    if (feeds.length > 0) {
    return (
      <div>
        <div className="heading">FEEDS</div>
          <div className="form-group">
            <Row>
              {feeds.map((item) => {
                const nameItem = getNameFromUrl(item.landingPageUrl);
                const isChecked = ('true' === localStorage.getItem('isShow_'+nameItem));
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
FeedsCheckboxPanel.propTypes = {
    boards: PropTypes.shape({}).isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
};

export default FeedsCheckboxPanel;
