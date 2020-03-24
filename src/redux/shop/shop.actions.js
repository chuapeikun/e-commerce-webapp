import ShopActionsTypes from './shop.types';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsError = errorMessage => ({
  type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapShot => {
      const collectionMap = convertCollectionSnapshotToMap(snapShot);
      dispatch(fetchCollectionsSuccess(collectionMap));
    }).catch(error => dispatch(fetchCollectionsError(error.message)));
  }
}



