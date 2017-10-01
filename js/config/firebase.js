import RNFirebase from 'react-native-firebase';

const instance = new RNFirebase({
  persistence: true,
});

export default instance;
