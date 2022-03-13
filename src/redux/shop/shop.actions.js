//==============IMPORTS---START---HERE====================//
import ShopActionTypes from './shop.types';

import { 
    getDocs,
    collection 
} from 'firebase/firestore';

import { 
    db,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

//====================IMPORTS===END===HERE====================//


//-------------------------FETCH_START-----------------------//
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

//---------------------FETCH_SUCCESS--------------------------//
export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

//----------------------FETCH_FAILURE------------------------//
export const fetchCollectionsFailure = errorMesage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMesage
});

//----------------------FETCH_ASYNC-------------------------//
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = collection(db, 'collections');
        dispatch(fetchCollectionsStart());

        getDocs(collectionRef).then(snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}
