import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveHeight } from '../utils/utils'; // 유틸리티 함수 임포트

const SurveyScreen = ({ navigation, route }) => {
  const [birthDate, setBirthDate] = useState(route.params.BirthDay || '');
  const [environment, setEnvironment] = useState('');
  const [customEnvironment, setCustomEnvironment] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const environments = ['회사', '병원', '카페', '공장'];
  const items = [
    '🐶 반려동물과 함께해요', '💻 공부를 해야해요', '🪴 식물을 돌보고있어요', '👶 육아를 하고있어요',
    '🍳 주방에서 요리를 자주해요', '🔊 소리에 민감해요', '😶‍🌫️ 습도에 민감해요', '💫깊은 잠을 자고싶어요',
    '💊 먼지와 습도에 민감한 알러지가 있어요', '💡 집중력이 필요해요', '🖼️ 습기에 민감한 제품이 있어요','🐶 반려동물과 함께해요', '💻 공부를 해야해요', '🪴 식물을 돌보고있어요', '👶 육아를 하고있어요',
    '🍳 주방에서 요리를 자주해요', '🔊 소리에 민감해요', '😶‍🌫️ 습도에 민감해요', '💫깊은 잠을 자고싶어요',
    '💊 먼지와 습도에 민감한 알러지가 있어요', '💡 집중력이 필요해요', '🖼️ 습기에 민감한 제품이 있어요'
  ];

  const handleItemPress = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    const surveyData = {
      UserName: route.params.UserName,
      BirthDay: birthDate,
      Gender: route.params.Gender,
      Street: route.params.Street,
      DetailStreet: route.params.DetailStreet,
      NickName: route.params.NickName,
      ImgRoot: route.params.ImgRoot,
      Environment: environment || customEnvironment,
      SelectedItems: selectedItems
    };

    console.log('Survey Data:', surveyData);

    navigation.navigate('MainTabs', {
      screen: '홈',
      params: { 
        screen: 'Home',
        params: { 
          nickname: route.params.NickName,
          profileImage: route.params.ImgRoot
        } 
      }
    }); // MainTabs로 이동하여 Home을 기본 화면으로 보여줌
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={getResponsiveIconSize(40)} color="#BFBFBF" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.stepText}>04</Text>
        <Text style={styles.title}>항목을 입력해주세요.</Text>
      </View>
      <ScrollView style={styles.inputConatainer}>
        <View style={styles.inputItem}>
          <Text style={styles.subtitle}>IEQ를 사용할 사용자의 생년월일을 입력해주세요.</Text>
          <TextInput
            style={[styles.input, styles.inputTextColor]} 
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="생년월일 8자리 (YYYYMMDD)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={8} 
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.subtitle}>어디에 계신가요?</Text>
          <View style={styles.environmentContainer}>
            {environments.map((env, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.environmentButton, environment === env && styles.selectedEnvironment]}
                onPress={() => setEnvironment(env)}
              >
                <Text style={styles.environmentButtonText}>{env}</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              style={[styles.input, styles.customEnvironmentInput]}
              value={customEnvironment}
              onChangeText={setCustomEnvironment}
              placeholder="기타: 입력"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.subtitle}>해당되는 항목을 선택해주세요.</Text>
          <View style={styles.itemsContainer}>
            {(showMore ? items : items.slice(0, 10)).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.itemButton, selectedItems.includes(item) && styles.selectedItem]}
                onPress={() => handleItemPress(item)}
              >
                <Text style={styles.itemButtonText}>{item}</Text>
              </TouchableOpacity>
            ))}
            {!showMore && items.length > 12 && (
              <TouchableOpacity style={styles.moreButton} onPress={() => setShowMore(true)}>
                <Text style={styles.moreButtonText}>...더보기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.inputItem}>
        <Text style={styles.subtitleSmall}>IEQ에서 나에게 맞는 환경을 확인하세요 !</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>IEQ 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: getResponsiveMargin(20),
  },
  stepText: {
    fontSize: getResponsiveFontSize(50),
    color: '#3261E6',
    fontWeight: 'bold'
  },
  title: {
    fontSize: getResponsiveFontSize(30),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  inputConatainer: {
    paddingTop: getResponsivePadding(30),
    height: getResponsiveHeight(10),
  },
  inputItem: {
    paddingTop: getResponsivePadding(20),
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    marginBottom: getResponsiveMargin(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: getResponsivePadding(15),
    borderRadius: 5,
  },
  environmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  environmentButton: {
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: getResponsiveMargin(10),
    marginBottom: getResponsiveMargin(10),
    width: '30%',
    alignItems: 'center',
  },
  selectedEnvironment: {
    backgroundColor: '#F4FAFF',
    borderColor: '#1e90ff',
  },
  environmentButtonText: {
    color: '#666',
  },
  customEnvironmentInput: {
    width: '30%',
    padding: getResponsivePadding(10), 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: getResponsiveMargin(10),
    marginBottom: getResponsiveMargin(10),
    color: '#000'
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemButton: {
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: getResponsiveMargin(10),
    marginBottom: getResponsiveMargin(10),
  },
  selectedItem: {
    backgroundColor: '#F4FAFF',
    borderColor: '#1e90ff',
  },
  itemButtonText: {
    color: '#666',
  },
  moreButton: {
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: getResponsiveMargin(10),
    marginBottom: getResponsiveMargin(10),
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#666',
  },
  subtitleSmall: {
    fontSize: getResponsiveFontSize(14),
    color: '#BFBFBF',
    textAlign: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: getResponsivePadding(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500'
  },
});

export default SurveyScreen;
