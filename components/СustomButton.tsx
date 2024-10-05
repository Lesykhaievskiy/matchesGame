import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    title: string,
    handlePress: () => void,
    otherStyles: string
}


const СustomButton: React.FC<Props> = ({title, handlePress, otherStyles}) => {
  return (
    <TouchableOpacity
      className={`bg-[#FF9C01] rounded-xl justify-center items-center min-h-[62] ${otherStyles}`}
      onPress={() => handlePress()}
    >
        <Text className='text-2xl'>{title}</Text>
    </TouchableOpacity>

  )
}

export default СustomButton