import _ from 'lodash/fp';
import { createAction } from 'redux-actions';
import { get } from 'lodash';
import { getRssFeedsListFromXML } from '../../../../../utils/rss-helpers';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const FETCH_GET_RSS_FEEDS_REQUEST = 'FETCH_GET_RSS_FEEDS_REQUEST';
export const FETCH_GET_RSS_FEEDS_SUCCESS = 'FETCH_GET_RSS_FEEDS_SUCCESS';
export const FETCH_GET_RSS_FEEDS_FAILURE = 'FETCH_GET_RSS_FEEDS_FAILURE';

export const fetchGetRssFeedsRequest = createAction(FETCH_GET_RSS_FEEDS_REQUEST);
export const fetchGetRssFeedsSuccess = createAction(FETCH_GET_RSS_FEEDS_SUCCESS);
export const fetchGetRssFeedsFailure = createAction(FETCH_GET_RSS_FEEDS_FAILURE);

export const fetchGetRssFeedsEpic = (action$, store) =>
  action$.ofType(FETCH_GET_RSS_FEEDS_REQUEST)
    .mergeMap(async res  => {
    const name = get(res, 'payload.rssFeedName', null);
    const feedsUrl = get(res, 'payload.rssFeedUrl', null);
    const url = CORS_PROXY + feedsUrl.replace("http://", "").replace("https://", "");
    const responseObject = await fetch(url)
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(responseData => getRssFeedsListFromXML(responseData))
        .then(res => res);
    if (Object.values(responseObject).length > 0) {
      return fetchGetRssFeedsSuccess({
        rssFeedName: name,
        feeds: responseObject.slice(0, 4),
      });
    }
    return fetchGetRssFeedsFailure();
});

export default function reducer(rssFeeds = {}, action) {
  switch (action.type) {
    case FETCH_GET_RSS_FEEDS_SUCCESS:
      return _.set(action.payload.rssFeedName, action.payload.feeds, rssFeeds);
    default:
      return rssFeeds;
  }
}

