import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const initialQuestionsCount = isTablet ? 15 : 10;
const loadMoreCount = isTablet ? 15 : 10;

const FAQScreen = () => {
  const allQuestions = [
    {
      number: 1,
      question: 'IEQ 디바이스 연결은 어떻게 하나요?',
      answer: 'IEQ 디바이스 연결은 먼저 IEQ를 연결하셔서 블루투스 연결을 하고 와이파이 연결을 하시면 됩니다.',
    },
    {
      number: 2,
      question: 'IEQ의 무드등은 내가 원하는대로 바뀌나요?',
      answer: '네. 원하시는 무드등 컬러를 선택하여 사용자가 원하는대로 밝기까지 바꿀 수 있습니다.',
    },
    {
      number: 3,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 4,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 5,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 6,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 7,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 8,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 9,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    {
      number: 10,
      question: 'IEQ 디바이스는 방수 기능이 있나요?',
      answer: 'IEQ 디바이스는 방수 기능이 없습니다.',
    },
    
    // 추가 질문과 답변들
  ];

  const [visibleQuestions, setVisibleQuestions] = useState(allQuestions.slice(0, initialQuestionsCount));
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null);

  const loadMoreQuestions = () => {
    const currentLength = visibleQuestions.length;
    const moreQuestions = allQuestions.slice(currentLength, currentLength + loadMoreCount);
    setVisibleQuestions([...visibleQuestions, ...moreQuestions]);
  };

  const toggleQuestion = (index) => {
    setExpandedQuestionIndex(index === expandedQuestionIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.FaqTit}>궁금한 사항이{'\n'}있으신가요?</Text>
      <ScrollView style={styles.faqContainer}>
        <Text style={styles.totalQuestionsText}>총 {allQuestions.length}개의 질문이 있습니다.</Text>
        {visibleQuestions.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <TouchableOpacity onPress={() => toggleQuestion(index)}>
              <View style={styles.questionRow}>
                <Text style={styles.questionNumber}>{String(item.number).padStart(2, '0')}</Text>
                <Text style={styles.questionText}>{item.question}</Text>
                <Icon name={expandedQuestionIndex === index ? 'chevron-up' : 'chevron-down'} size={24} color="#000" />
              </View>
            </TouchableOpacity>
            {expandedQuestionIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
        {visibleQuestions.length < allQuestions.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreQuestions}>
            <Text style={styles.loadMoreText}>더보기 <Icon name="chevron-down" size={24} color="#1e90ff" /></Text>
          </TouchableOpacity>
        )}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  FaqTit: {
    fontSize: getResponsiveFontSize(30),
    fontWeight: '400',
    color: '#000',
    padding: getResponsivePadding(20),
  },
  faqContainer: {
    padding: 0,
    backgroundColor: '#fff',
  },
  questionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsivePadding(12),
  },
  questionNumber: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: 'bold',
    color: '#00aaff',
    marginRight: getResponsiveMargin(10),
  },
  questionText: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  answerContainer: {
    backgroundColor: '#edf0f3',
    padding: getResponsivePadding(20),
    borderRadius: 5,
  },
  answerText: {
    fontSize: getResponsiveFontSize(13),
    color: '#363636',
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getResponsiveMargin(20),
  },
  loadMoreText: {
    fontSize: getResponsiveFontSize(16),
    color: '#1e90ff',
    marginRight: getResponsiveMargin(10),
  },
  totalQuestionsText: {
    fontSize: getResponsiveFontSize(12),
    fontWeight: '400',
    color: '#3f424e',
    borderBottomWidth: 1,
    borderBottomColor: '#a8a8a8',
    backgroundColor:'#ddd',
    padding: getResponsivePadding(10),
  },
});

export default FAQScreen;
