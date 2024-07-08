import axios from 'axios';

// 점수 등록 함수
export const postDiaryEntry = async (userId, appReq, appReq2, callback) => {
    try {
        console.log('Sending request to server with data:', {
            UserId: userId,
            AppReq: appReq,
            AppReq2: appReq2,
        });

        const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/SetTodayDiary', {
            UserId: userId,
            AppReq: appReq,
            AppReq2: appReq2,
        });

        console.log('Server response:', response.data);
        console.log('Response status:', response.status);
        console.log('Response statusCode:', response.data.statusCode);

        if (response.status === 200 && response.data.statusCode == 200) {
            callback(null, response.data);
        } else {
            callback(new Error('Failed to save diary entry'), null);
        }
    } catch (error) {
        console.log('Error occurred:', error);
        callback(error, null);
    }
};

// 항목 조회 함수
export const fetchDiaryEntries = async (userId, appReq2, callback) => {
    try {
        const data = {
            UserId: userId,
            AppReq: '수면, 공부, 산책, 요리',
            AppReq2: appReq2,
        };
        console.log('Fetching entries from server with data:', data);

        const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetDiary', data);

        console.log('Server response:', response.data);
        console.log('Response status:', response.status);
        console.log('Response statusCode:', response.data.statusCode);

        if (response.status === 200 && response.data.statusCode == 200) {
            callback(null, response.data);
        } else {
            callback(new Error('Failed to fetch diary entries'), null);
        }
    } catch (error) {
        console.log('Error occurred:', error);
        callback(error, null);
    }
};