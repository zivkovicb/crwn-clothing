import { 
    takeLatest,
    call,
    put,
    all
} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { 
    collection,
    getDocs
} from 'firebase/firestore';

import { 
    db,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

import { 
    fetchCollectionsFailure,
    fetchCollectionsSuccess
} from './shop.actions';

//=======================================================================//

export function* fetchCollectionsAsync() {
    yield console.log('I am fired');

    try{
        const collectionRef = collection(db, 'collections');
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}
