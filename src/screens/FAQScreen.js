import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const initialQuestionsCount = isTablet ? 15 : 10;
const loadMoreCount = isTablet ? 15 : 10;

const FAQScreen = () => {
  const allQuestions = Array.from({ length: 100 }, (_, i) => ({
    question: `IEQ 디바이스 연결은 어떻게 하나요? ${i + 1}`,
    answer: `IEQ 디바이스 연결은 먼저 IEQ를 연결하셔서 블루투스 연결을 하고 와이파이 연결을 하시면 됩니다.\n\n감사합니다. ${i + 1}`,
  }));

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
    <ScrollView style={styles.container}>
      {visibleQuestions.map((item, index) => (
        <View key={index} style={styles.questionContainer}>
          <TouchableOpacity onPress={() => toggleQuestion(index)}>
            <Text style={styles.questionText}>{item.question}</Text>
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
          <Text style={styles.loadMoreText}>더보기</Text>
          <Icon name="chevron-down" size={24} color="#1e90ff" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#f5f5f5',
  },
  questionContainer: {
    marginBottom: getResponsiveMargin(10),
  },
  questionText: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '500',
    color: '#333',
    borderBottomWidth: 2,
    paddingBottom: getResponsivePadding(10),
    borderBottomColor: '#ddd'
  },
  answerContainer: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    borderRadius: 5,
  },
  answerText: {
    fontSize: getResponsiveFontSize(15),
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
});

export default FAQScreen;
