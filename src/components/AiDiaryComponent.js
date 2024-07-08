import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import { postDiaryEntry, fetchDiaryEntries } from './apiRequests'; // API 요청 함수 임포트
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveHeight } from '../utils/utils';

const AiDiaryComponent = ({ moodItems, setMoodItems }) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // selectedDate 초기화
    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isAddMode, setAddMode] = useState(false);
    const [newMoodItem, setNewMoodItem] = useState({ moodName: '수면', rating: 1 });
    const [isAddConfirmVisible, setAddConfirmVisible] = useState(false);
    const [hasEntries, setHasEntries] = useState(true); // 추가된 상태

    const showCalendar = () => {
        setCalendarVisibility(true);
    };

    const hideCalendar = () => {
        setCalendarVisibility(false);
    };

    const handleDayPress = (day) => {
        setSelectedDate(new Date(day.dateString));
        fetchEntriesForDate(day.dateString);
        hideCalendar();
    };

    const handleWeekDayPress = (date) => {
        setSelectedDate(date);
        fetchEntriesForDate(date.toISOString().split('T')[0]);
    };

    const fetchEntriesForDate = (date) => {
        const formattedDate = date.slice(2).replace(/-/g, ''); // '2024-07-01' -> '240701'
        console.log('Fetching diary entries for date:', formattedDate);
        fetchDiaryEntries('test200', formattedDate, (error, data) => {
            if (error) {
                console.log('Error response:', error);
                Alert.alert('Error', 'Failed to fetch diary entries');
            } else {
                console.log('Success response:', data);
                if (data.item.length === 0) {
                    setHasEntries(false); // 항목이 없을 때
                    setMoodItems([]);
                } else {
                    setHasEntries(true); // 항목이 있을 때
                    const fetchedMoodItems = data.item.map(entry => ({
                        id: entry[Object.keys(entry)[0]].diaryDefaultId,
                        moodName: entry[Object.keys(entry)[0]].name,
                        rating: entry[Object.keys(entry)[0]].star,
                        image: getMoodImage(entry[Object.keys(entry)[0]].name)
                    }));
                    setMoodItems(fetchedMoodItems);
                    Alert.alert('Success', 'Diary entries fetched successfully');
                }
            }
        });
    };

    const handleSetRating = (id, rating, moodName) => {
        console.log(`Setting rating for item ${id} to ${rating}`);
        postDiaryEntry('test200', moodName, rating.toString(), (error, data) => {
            if (error) {
                console.log('Error response:', error);
                Alert.alert('Error', 'Failed to save diary entry');
            } else {
                console.log('Success response:', data);
                const updatedMoodItems = moodItems.map(item => {
                    if (item.id === id) {
                        return { ...item, rating };
                    }
                    return item;
                });
                setMoodItems(updatedMoodItems);
                Alert.alert('Success', 'Diary entry saved successfully');
            }
        });
    };

    const confirmDeleteItem = (item) => {
        setItemToDelete(item);
        setDeleteModalVisibility(true);
    };

    const handleDeleteItem = () => {
        const updatedMoodItems = moodItems.filter(item => item.id !== itemToDelete.id);
        setMoodItems(updatedMoodItems);
        setDeleteModalVisibility(false);
        setItemToDelete(null);
    };

    const handleAddItem = () => {
        postDiaryEntry('test200', newMoodItem.moodName, newMoodItem.rating.toString(), (error, data) => {
            if (error) {
                Alert.alert('Error', 'Failed to save diary entry');
            } else {
                setMoodItems([
                    ...moodItems,
                    { id: moodItems.length + 1, moodName: newMoodItem.moodName, rating: newMoodItem.rating, image: getMoodImage(newMoodItem.moodName) }
                ]);
                setAddConfirmVisible(true);
                setNewMoodItem({ moodName: '수면', rating: 1 });
                setAddMode(false);
                Alert.alert('Success', 'Diary entry saved successfully');
            }
        });
    };

    const getMoodImage = (moodName) => {
        switch (moodName) {
            case '수면':
                return require('../assets/images/night.png');
            case '공부':
                return require('../assets/images/study.png');
            case '산책':
                return require('../assets/images/running.png');
            case '요리':
                return require('../assets/images/cook.png');
        }
    };

    const renderItem = (item) => (
        <View style={[styles.moodContainer, styles.flexRow]} key={item.id}>
            <View style={styles.flexRow}>
                <Image source={item.image} style={styles.moodImage} />
                <Text style={styles.moodText}>{item.moodName}</Text>
            </View>
            <View style={styles.flexRow}>
                {[1, 2, 3, 4, 5].map((circle) => (
                    <TouchableOpacity
                        key={circle}
                        style={[
                            styles.circle,
                            { backgroundColor: item.rating >= circle ? '#1e90ff' : '#add8e6' },
                        ]}
                        onPress={() => handleSetRating(item.id, circle, item.moodName)}
                    />
                ))}
                {isEditMode && (
                    <TouchableOpacity onPress={() => confirmDeleteItem(item)}>
                        <Icon name="remove-circle-outline" size={getResponsiveIconSize(30)} color="#e64e57" style={styles.deleteIcon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i - today.getDay());
        return date;
    });

    return (
        <View>
            <Text style={styles.aiDiaryTitle}>나의 다이어리</Text>
            <View style={styles.aiDiaryContainer}>
                <View style={styles.borderBottom}>
                    <View style={styles.dateHeader}>
                        <Text style={styles.dateYMD}>{`${selectedDate.getFullYear()}년 ${String(selectedDate.getMonth() + 1).padStart(2, '0')}월 ${String(selectedDate.getDate()).padStart(2, '0')}일`}</Text>
                        <TouchableOpacity onPress={showCalendar}>
                            <Icon name="calendar-outline" size={getResponsiveIconSize(24)} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.weekContainer}>
                        {weekDays.map((date, index) => {
                            const isToday = date.toDateString() === today.toDateString();
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.dayContainer,
                                        isToday && styles.todayContainer,
                                        !isToday && isSelected && styles.selectedDayContainer,
                                    ]}
                                    onPress={() => handleWeekDayPress(date)}
                                >
                                    <Text style={[styles.dateText, isToday && styles.today]}>
                                        {String(date.getDate()).padStart(2, '0')}
                                    </Text>
                                    <Text style={[styles.dayText, isToday && styles.today]}>
                                        {days[date.getDay()]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.borderBottom}>
                    <View style={styles.promptContainer}>
                        <View style={styles.flex}>
                            <Text style={styles.promptText}>오늘 나의 하루는</Text>
                            <Text style={styles.promptText}>어떠셨나요?</Text>
                        </View>
                        {hasEntries && (
                            <TouchableOpacity style={styles.recordButton} onPress={() => setEditMode(!isEditMode)}>
                                <Text style={styles.recordButtonText}>기록 선택</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {!hasEntries && ( // 기록이 없을 때 표시
                        <View style={styles.noEntriesContainer}>
                            <Text style={styles.noEntriesText}>기록이 없습니다.</Text>
                        </View>
                    )}
                    {moodItems && moodItems.map(item => renderItem(item))}
                    {isAddMode && (
                        <View style={styles.addItemContainer}>
                            <Picker
                                selectedValue={newMoodItem.moodName}
                                style={styles.picker}
                                onValueChange={(itemValue) => setNewMoodItem({ ...newMoodItem, moodName: itemValue })}
                            >
                                <Picker.Item label="수면" value="수면" />
                                <Picker.Item label="공부" value="공부" />
                                <Picker.Item label="산책" value="산책" />
                                <Picker.Item label="요리" value="요리" />
                            </Picker>
                            <View style={styles.flexRow}>
                                {[1, 2, 3, 4, 5].map((circle) => (
                                    <TouchableOpacity
                                        key={circle}
                                        style={[
                                            styles.circle,
                                            { backgroundColor: newMoodItem.rating >= circle ? '#1e90ff' : '#add8e6' },
                                        ]}
                                        onPress={() => setNewMoodItem({ ...newMoodItem, rating: circle })}
                                    />
                                ))}
                                <TouchableOpacity onPress={handleAddItem}>
                                    <Icon name="add-circle-outline" size={getResponsiveIconSize(30)} color="#222A90" style={styles.addIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {hasEntries && (
                        <TouchableOpacity style={styles.addButton} onPress={() => setAddMode(!isAddMode)}>
                            <Icon name="add-circle-outline" size={getResponsiveIconSize(35)} color="#b0b3bb" style={styles.addIcon} />
                            <Text style={styles.addButtonText}>기록 추가하기</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Modal visible={isCalendarVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={{
                                [selectedDate.toISOString().split('T')[0]]: {
                                    selected: true,
                                    selectedColor: '#1e90ff',
                                },
                            }}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={hideCalendar}>
                            <Text style={styles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={isDeleteModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.deleteModal}>
                        <Text style={styles.deleteModalText}>해당 목록을 삭제하시겠습니까?</Text>
                        <View style={styles.deleteModalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setDeleteModalVisibility(false)}>
                                <Text style={styles.modalButtonText}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteItem}>
                                <Text style={styles.modalButtonText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={isAddConfirmVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.addModal}>
                        <Text style={styles.addModalText}>항목이 추가되었습니다.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setAddConfirmVisible(false)}>
                            <Text style={styles.modalButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    aiDiaryContainer: {
        backgroundColor: '#fff',
        borderRadius: getResponsiveMargin(10),
        marginBottom: getResponsiveMargin(20),
    },
    aiDiaryTitle: {
        fontSize: getResponsiveFontSize(18),
        marginBottom: getResponsiveMargin(10),
        color: '#000',
        fontWeight: '600',
    },
    borderBottom: {
        borderBottomWidth: 3,
        borderColor: '#F2F4F8',
        padding: getResponsivePadding(20),
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: getResponsivePadding(10),
    },
    dateYMD: {
        color: '#000',
        fontSize: getResponsiveFontSize(16),
        fontWeight: '500',
        paddingRight: getResponsivePadding(10),
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getResponsiveMargin(10),
    },
    dayContainer: {
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingVertical: getResponsivePadding(20),
        paddingHorizontal: getResponsivePadding(18),
        borderRadius: getResponsiveMargin(10),
    },
    todayContainer: {
        borderWidth: 2,
        borderColor: '#002060',
        borderRadius: getResponsiveMargin(70),
    },
    selectedDayContainer: {
        borderWidth: 2,
        borderColor: '#7b8c94',
        borderRadius: getResponsiveMargin(10),
    },
    dateText: {
        fontSize: getResponsiveFontSize(18),
        color: '#000',
    },
    dayText: {
        fontSize: getResponsiveFontSize(16),
        color: '#888',
    },
    today: {
        color: '#002060',
        fontWeight: 'bold',
    },
    promptContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: getResponsivePadding(10),
    },
    promptText: {
        fontSize: getResponsiveFontSize(18),
        color: '#000',
    },
    noEntriesContainer: {
        marginTop: getResponsiveMargin(10),
        padding: getResponsivePadding(10),
        backgroundColor: '#eceff5',
        borderRadius: getResponsiveMargin(5),
        paddingVertical: getResponsivePadding(50),
    },
    noEntriesText: {
        color: '#232835',
        fontSize: getResponsiveFontSize(16),
        textAlign: 'center',
    },
    recordButton: {
        paddingVertical: getResponsivePadding(5),
    },
    recordButtonText: {
        color: '#BFBFBF',
        fontSize: getResponsiveFontSize(16),
    },
    addButton: {
        backgroundColor: '#F8F8F8',
        paddingVertical: getResponsivePadding(15),
        borderRadius: getResponsiveMargin(5),
        marginTop: getResponsiveMargin(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#A6A6A6',
        fontSize: getResponsiveFontSize(16),
        textAlign: 'center',
        paddingLeft: getResponsivePadding(10),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendarContainer: {
        backgroundColor: '#fff',
        padding: getResponsivePadding(20),
        borderRadius: getResponsiveMargin(10),
        width: '80%',
        height: getResponsiveHeight(50),
        justifyContent: 'space-between',
    },
    closeButton: {
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        padding: getResponsivePadding(10),
        borderRadius: getResponsiveMargin(5),
    },
    closeButtonText: {
        fontSize: getResponsiveFontSize(16),
    },
    deleteModal: {
        backgroundColor: '#fff',
        padding: getResponsivePadding(30),
        borderRadius: getResponsiveMargin(10),
        alignItems: 'center',
        width: '60%',
    },
    deleteModalText: {
        fontSize: getResponsiveFontSize(18),
        marginBottom: getResponsiveMargin(20),
        color: '#000',
    },
    deleteModalButtons: {
        flexDirection: 'row',
    },
    addModal: {
        backgroundColor: '#fff',
        padding: getResponsivePadding(30),
        borderRadius: getResponsiveMargin(10),
        alignItems: 'center',
        width: '60%',
    },
    addModalText: {
        fontSize: getResponsiveFontSize(18),
        marginBottom: getResponsiveMargin(20),
        color: '#000',
    },
    modalButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: getResponsivePadding(10),
        paddingHorizontal: getResponsivePadding(30),
        borderRadius: getResponsiveMargin(5),
        alignItems: 'center',
        width: '50%',
        margin: getResponsiveMargin(3),
    },
    modalButtonText: {
        color: '#fff',
        fontSize: getResponsiveFontSize(16),
    },
    flex: {
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodContainer: {
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: getResponsiveMargin(5),
        alignSelf: 'center',
        padding: getResponsivePadding(10),
        marginBottom: getResponsiveMargin(10),
    },
    moodImage: {
        width: getResponsiveIconSize(40),
        height: getResponsiveIconSize(40),
        marginRight: getResponsiveMargin(10),
    },
    moodText: {
        fontSize: getResponsiveFontSize(16),
        color: '#000',
        fontWeight: 'bold',
    },
    circle: {
        width: getResponsiveIconSize(20),
        height: getResponsiveIconSize(20),
        borderRadius: getResponsiveIconSize(10),
        margin: getResponsiveMargin(5),
    },
    deleteIcon: {
        marginLeft: getResponsiveMargin(10),
    },
    addIcon: {
        marginLeft: getResponsiveMargin(10),
    },
    addItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        flex: 1,
        height: getResponsiveHeight(50),
        backgroundColor: '#cdd1dd',
        borderWidth: 2,
        borderRadius: getResponsiveMargin(5),
        marginRight: getResponsiveMargin(10),
        borderColor: '#ddd',
    },
});

export default AiDiaryComponent;
