import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { createAction } from 'redux-actions';
import { get } from 'lodash';
import { getRssFeedsListFromXML } from '../../../../../utils/rss-helpers';

export const FETCH_GET_RSS_FEEDS_REQUEST = 'FETCH_GET_RSS_FEEDS_REQUEST';
export const FETCH_GET_RSS_FEEDS_SUCCESS = 'FETCH_GET_RSS_FEEDS_SUCCESS';
export const FETCH_GET_RSS_FEEDS_FAILURE = 'FETCH_GET_RSS_FEEDS_FAILURE';

export const fetchGetRssFeedsRequest = createAction(FETCH_GET_RSS_FEEDS_REQUEST);
export const fetchGetRssFeedsSuccess = createAction(FETCH_GET_RSS_FEEDS_SUCCESS);
export const fetchGetRssFeedsFailure = createAction(FETCH_GET_RSS_FEEDS_FAILURE);

export const fetchGetRssFeedsEpic = (action$, store) =>
  action$.ofType(FETCH_GET_RSS_FEEDS_REQUEST)
    .mergeMap( res  => {
      const name = get(res, 'payload.rssFeedName', null);
      const url = get(res, 'payload.rssFeedUrl', null);
      return Observable.ajax({
        url: 'https://cors-proxy.htmldriven.com/?url=' + url,
          crossDomain: true,
          responseType: 'application/rss+xml',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
          .map(response => {
            const responseString = get(response, 'response', null);
            const responseObject = JSON.parse(responseString);
            if (get(responseObject, 'success', false)) {
              const rss = get(responseObject, 'body', null);
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(rss, 'text/xml');
              return fetchGetRssFeedsSuccess({
                rssFeedName: name,
                feeds: getRssFeedsListFromXML(xmlDoc),
              })
            }
            return fetchGetRssFeedsFailure();
          });
        }
    );

export default function reducer(rssFeeds = {}, action) {
  switch (action.type) {
    case FETCH_GET_RSS_FEEDS_SUCCESS:
      return _.set(action.payload.rssFeedName, action.payload.feeds, rssFeeds);
    default:
      return rssFeeds;
  }
}

