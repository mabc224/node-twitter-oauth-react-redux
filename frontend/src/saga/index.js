import { take, put, call, fork, all } from 'redux-saga/effects'
import { getUserTweets } from './../services/api';
import { getUserTweetsError, getUserTweetsSuccess } from './../actions/Profile';


function* getUserTweetsRequest(data) {
    try {
        const response = yield call(getUserTweets, data);
        yield put(getUserTweetsSuccess(response));
    } catch (e) {
        yield put(getUserTweetsError(e.message));
    }

}

export function* watchGetUserTweets() {
    while (true) {
        const {data } = yield take('GET_USER_TWEET');
        yield fork(getUserTweetsRequest, data );
    }
}


export default function * rootSaga() {
    yield all([watchGetUserTweets() ]);
}