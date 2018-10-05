import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { getNameFromUrl } from '../../../../utils/rss-helpers';
import RssDashboardPanel from './RssDashboardPanel';

/**
 * This component returns panels for Feeds
 *
 * @param {object} boards
 * @param {func} handleGoToState
 * @param {bool} isHasPreview
 * @param {bool} isHasList
 * @return {XML}
 */
const FeedsPanelList = ({ boards, handleGoToState, isHasPreview, isHasList }) => {
  const feeds = get(boards, 'feeds.feeds', []);
  return(
    <span>
      {feeds.map((item, index) => {
        return (
          <FeedsPanel
            key={index}
            item={item}
            handleGoToState={handleGoToState}
            isHasPreview={isHasPreview}
            isHasList={isHasList}
          />
        );
      })}
    </span>
  );
};
FeedsPanelList.propTypes = {
    boards: PropTypes.shape({}).isRequired,
    handleGoToState: PropTypes.func.isRequired,
    isHasPreview: PropTypes.bool.isRequired,
    isHasList: PropTypes.bool.isRequired,
};

/**
 * This component returns one single Feed panel
 *
 * @param {object} item
 * @param {func} handleGoToState
 * @param {bool} isHasPreview
 * @param {bool} isHasList
 * @return {XML}
 */
const FeedsPanel = ({ item, handleGoToState, isHasPreview, isHasList }) => {
  const nameItem = getNameFromUrl(item.landingPageUrl);
  const isShow = ('true' === localStorage.getItem('isShow_'+nameItem));
  return (isShow ?
    <RssDashboardPanel
      key={nameItem}
      title={item.name}
      state={item.landingPageUrl}
      goToState={handleGoToState}
      rssFeedName={nameItem}
      rssFeedUrl={item.rssFeedUrl}
      isHasPreview={isHasPreview}
      isHasList={isHasList}
    />
    : null
  );
};
FeedsPanel.propTypes = {
    item: PropTypes.shape({}).isRequired,
    handleGoToState: PropTypes.func.isRequired,
    isHasPreview: PropTypes.bool.isRequired,
    isHasList: PropTypes.bool.isRequired,
};

export default FeedsPanelList;