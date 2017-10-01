import { Vibration } from 'react-native';

export default function endFocusSession() {
  Vibration.vibrate([0, 200, 200, 1000], true);
  setTimeout(() => {
    Vibration.cancel();
  }, 6000);
}