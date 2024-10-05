import { View, Text } from 'react-native';
import React from 'react';

interface Props {
    numberOfMatches: number; 
    title: string;
    otherStyles: string;
}

const NumberOfMatches: React.FC<Props> = ({ numberOfMatches, title, otherStyles }) => {
  return (
    <>
    
     <View className={`w-24 h-24 bg-[#232533] justify-center items-center rounded-lg ${otherStyles}`}>
     <Text className='text-md font-semibold text-white text-center mb-2'>{title}:</Text>
      <Text className="text-4xl font-bold text-white">{numberOfMatches}</Text>
    </View>
    </>
   
  );
};

export default NumberOfMatches;
