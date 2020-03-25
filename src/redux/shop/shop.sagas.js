import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsError } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('I am fired')

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    // put is just like dispatch
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsError(error.message))
  }    
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}
