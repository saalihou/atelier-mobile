import measureSaga from './measure';

export default function* rootSaga() {
  yield [measureSaga()];
}
