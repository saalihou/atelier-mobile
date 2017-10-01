import firebase from '../../config/firebase';

const db = firebase.database();

export function push(key, value) {
  const newValueRef = db.ref(key).push();
  newValueRef.set(value);
}

export function save(key, value) {
  db.ref(key).set(value);
}
