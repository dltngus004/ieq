import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodLightContext = createContext();

export const MoodLightProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [color, setColor] = useState('#FFFFFF');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedIsEnabled = await AsyncStorage.getItem('moodLightIsEnabled');
        const savedBrightness = await AsyncStorage.getItem('moodLightBrightness');
        const savedColor = await AsyncStorage.getItem('moodLightColor');

        if (savedIsEnabled !== null) {
          setIsEnabled(JSON.parse(savedIsEnabled));
        }
        if (savedBrightness !== null) {
          setBrightness(parseInt(savedBrightness, 10));
        }
        if (savedColor !== null) {
          setColor(savedColor);
        }
      } catch (error) {
        console.error('Failed to load mood light settings', error);
      }
    };

    loadSettings();
  }, []);

  const toggleMoodLight = async (enabled) => {
    setIsEnabled(enabled);
    await AsyncStorage.setItem('moodLightIsEnabled', JSON.stringify(enabled));
  };

  const updateBrightness = async (newBrightness) => {
    setBrightness(newBrightness);
    await AsyncStorage.setItem('moodLightBrightness', newBrightness.toString());
  };

  const updateColor = async (newColor) => {
    setColor(newColor);
    await AsyncStorage.setItem('moodLightColor', newColor);
  };

  return (
    <MoodLightContext.Provider value={{ isEnabled, toggleMoodLight, brightness, updateBrightness, color, updateColor }}>
      {children}
    </MoodLightContext.Provider>
  );
};

export const useMoodLight = () => useContext(MoodLightContext);
