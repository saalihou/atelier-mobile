import DeviceInfo from 'react-native-device-info';

export default function getUserId(): string {
  return DeviceInfo.getPhoneNumber() || DeviceInfo.getUniqueID();
}
