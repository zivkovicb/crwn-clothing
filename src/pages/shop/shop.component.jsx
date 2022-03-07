import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.actions';

import { 
    collection,
    onSnapshot 
} from 'firebase/firestore';

import { 
    firestore,
    db,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(db, 'collections');

        onSnapshot(collectionRef, (snapshot) => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            console.log('hi');
        });
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => 
        dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);