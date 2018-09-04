import { combineEpics } from 'redux-observable';
import asyncComponent from '../../../../components/containers/AsyncComponent/AsyncComponent';
import UserProfile from '../../../pages/UserProfile/UserProfile';
import { themeClientUrls } from '../../config/clientUrls';
import { fetchFeedsEpic } from './ducks/fetch-feeds.duck';
import { fetchFeedsUpdateEpic } from './ducks/fetch-feeds.duck';
import { fetchFeedsDetailEpic } from './ducks/fetch-feeds-detail.duck';
import { fetchFeedsDetailEditEpic } from './ducks/fetch-feeds-detail-edit.duck';
import { fetchFeedsCreateEpic } from './ducks/fetch-feeds-create.duck';
import { fetchGetRssFeedsEpic } from './ducks/fetch-get-rss-feeds.duck';

import feeds from './ducks/fetch-feeds.duck';
import feedsDetail from './ducks/fetch-feeds-detail.duck';
import feedsDetailEdit from './ducks/fetch-feeds-detail-edit.duck';
import feedsCreate from './ducks/fetch-feeds-create.duck';
import rssFeeds from './ducks/fetch-get-rss-feeds.duck';

const epics = combineEpics(fetchFeedsEpic, fetchFeedsDetailEpic, fetchFeedsDetailEditEpic, fetchFeedsCreateEpic, fetchFeedsUpdateEpic, fetchGetRssFeedsEpic);

const Feeds = asyncComponent(() => import(/* webpackChunkName: "feeds" */ './Feeds').then(module => module.default));

const reducers = {
  feeds,
  feedsDetail,
  feedsDetailEdit,
  feedsCreate,
  rssFeeds
};

const sidebarConfig = { key: 'feeds', pathToTransition: '/feeds', name: 'Feeds', isVisible: true };

const routers = [
  { key: 'feeds', component: Feeds, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.FEEDS}`},
  { key: 'feedsCreate', component: Feeds, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.FEEDS}`},
  { key: 'feedsDetail', component: Feeds, path: `${themeClientUrls.PATIENTS}/:userId/${themeClientUrls.FEEDS}`},
];

export default {
  component: Feeds,
  epics, reducers, sidebarConfig, routers,
}

