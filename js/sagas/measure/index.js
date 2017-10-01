import { takeEvery, call, put } from 'redux-saga/effects';
import { ToastAndroid } from 'react-native';

import { Types, Measure, measureSaved } from '../../actions/measure';
import getUserId from '../utils/getUserId';
import { push } from '../utils/db';

function* saveMeasure(action: { measure: Measure }) {
  const userId = yield call(getUserId);
  yield call(push, `measures/${userId}`, action.measure);
  yield put(measureSaved());
  yield call(ToastAndroid.show, 'Enregistré', ToastAndroid.SHORT);
}

export default function* measureSaga() {
  yield [takeEvery(Types.SAVE_MEASURE, saveMeasure)];
}
