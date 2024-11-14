// firestore.js
import firestore from '@react-native-firebase/firestore';

// Firestore 오프라인 설정 및 초기화 함수
export const initializeFirestore = () => {
  firestore()
    .settings({
      persistence: true,
    })
    .then(() => {
      console.log('Firestore persistence 설정 완료');
    })
    .catch((error) => {
      console.error('Firestore persistence 설정 중 오류 발생:', error);
    });
};

export default firestore;
