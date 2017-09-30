import { takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { Types } from '../../actions/measure';

function* saveMeasure(action) {
  yield delay(1000);
  console.log('saveMeasure', action);
}

export default function* measureSaga() {
  yield [takeEvery(Types.SAVE_MEASURE, saveMeasure)];
}
