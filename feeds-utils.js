import _ from 'lodash/fp';

export const fetchFeedsOnMount = ({
    componentDidMount() {
        const { actions, match } = this.props;
        actions.fetchFeedsRequest();
    },
});
export const fetchFeedsDetailOnMount = ({
    componentDidMount() {
        const { actions, match } = this.props;
        const sourceId = _.get('params.sourceId', match);
        if (sourceId) actions.fetchFeedsDetailRequest({ sourceId });
    },
});
