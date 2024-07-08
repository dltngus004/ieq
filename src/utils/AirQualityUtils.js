// src/utils/AirQualityUtils.js
export const getStatusAndProgress = (label, value) => {
    let status = '';
    let progress = 0;
    let color = 'green';
    let message = '';
  
    switch (label) {
      case 'Temp':
        if (value < 18) {
          status = '추움';
          color = 'blue';
          progress = value / 18 * 0.33;
          message = '오늘은 따뜻하게 입으세요!';
        } else if (value >= 18 && value <= 24) {
          status = '적정';
          color = 'green';
          progress = (value - 18) / 6 * 0.33 + 0.33;
          message = '오늘은 산책을 해보세요!';
        } else {
          status = '더움';
          color = 'red';
          progress = (value - 24) / 6 * 0.34 + 0.66;
          message = '오늘은 시원하게 보내세요!';
        }
        break;
      case 'Humi':
        if (value < 30) {
          status = '건조';
          color = 'blue';
          progress = value / 30 * 0.33;
          message = '오늘은 가습기를 사용하세요!';
        } else if (value >= 30 && value <= 60) {
          status = '적정';
          color = 'green';
          progress = (value - 30) / 30 * 0.33 + 0.33;
          message = '습도가 적절합니다!';
        } else {
          status = '습함';
          color = 'red';
          progress = (value - 60) / 40 * 0.34 + 0.66;
          message = '제습기를 사용하세요!';
        }
        break;
      case 'eCO2':
        if (value < 600) {
          status = '좋음';
          color = 'green';
          progress = value / 600 * 0.5;
          message = '공기가 좋습니다!';
        } else if (value >= 600 && value <= 1000) {
          status = '보통';
          color = 'yellow';
          progress = (value - 600) / 400 * 0.5 + 0.5;
          message = '환기가 필요합니다!';
        } else {
          status = '나쁨';
          color = 'red';
          progress = 1;
          message = '외출을 자제하세요!';
        }
        break;
      case 'TVOC':
        if (value < 220) {
          status = '좋음';
          color = 'green';
          progress = value / 220 * 0.5;
          message = '공기가 좋습니다!';
        } else if (value >= 220 && value <= 660) {
          status = '보통';
          color = 'yellow';
          progress = (value - 220) / 440 * 0.5 + 0.5;
          message = '환기가 필요합니다!';
        } else {
          status = '나쁨';
          color = 'red';
          progress = 1;
          message = '외출을 자제하세요!';
        }
        break;
      case 'AQI':
        if (value <= 1) {
          status = '좋음';
          color = 'green';
          progress = value / 5;
          message = '공기가 좋습니다!';
        } else if (value <= 3) {
          status = '보통';
          color = 'yellow';
          progress = (value - 1) / 2 * 0.5 + 0.5;
          message = '외출 시 마스크를 착용하세요!';
        } else {
          status = '나쁨';
          color = 'red';
          progress = 1;
          message = '외출을 자제하세요!';
        }
        break;
      case 'Illuminace':
        if (value < 100) {
          status = '어두움';
          color = 'blue';
          progress = value / 100;
          message = '조명이 어둡습니다!';
        } else if (value <= 300) {
          status = '적정';
          color = 'green';
          progress = (value - 100) / 200 + 0.33;
          message = '조명이 적절합니다!';
        } else {
          status = '밝음';
          color = 'yellow';
          progress = (value - 300) / 700 + 0.66;
          message = '조명이 밝습니다!';
        }
        break;
      case 'Noise':
        if (value < 40) {
          status = '조용함';
          color = 'green';
          progress = value / 40;
          message = '주변이 조용합니다!';
        } else if (value <= 70) {
          status = '보통';
          color = 'yellow';
          progress = (value - 40) / 30 + 0.5;
          message = '주변이 약간 시끄럽습니다!';
        } else {
          status = '시끄러움';
          color = 'red';
          progress = 1;
          message = '주변이 매우 시끄럽습니다!';
        }
        break;
      default:
        status = '알 수 없음';
        progress = 0;
        color = 'grey';
        message = '데이터를 확인하세요.';
        break;
    }
  
    return { status, progress, color, message };
  };
  