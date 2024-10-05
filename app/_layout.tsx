import NumberOfMatches from '@/components/NumberOfMatches';
import CustomButton from '@/components/СustomButton';
import React, {useCallback, useEffect, useState} from 'react';
import { View, Text } from 'react-native';

const INITIAL_MATCHES_COUNT = 25;

const optimalComputerMove = (n: number) => {
  if (n > 0) {
    const remainder = (n - 1) % 4;
    return remainder === 0 ? 3 : remainder;
  }
  return 0;
};


enum Competitor {
    Player = 'player',
    Computer = 'computer'
}


const Layout: React.FC = () => {
  const [matches, setMatches] = useState(INITIAL_MATCHES_COUNT);
  const [playerMatches, setPlayerMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [turn, setTurn] = useState<Competitor>(Competitor.Player);
  const [winner, setWinner] = useState<Competitor | null>(null);

  const handlePlayerMove = useCallback((num: number) => {
    if (matches - num >= 0) {
      setMatches(prevMatches => prevMatches - num);
      setPlayerMatches((prevPlayerMatches) => prevPlayerMatches + num);
      setTurn(Competitor.Computer);
    }
    return matches - num;
  }, [matches]);


  const computerMove = (matchesLeft: number) => {
    const matchesToTake = optimalComputerMove(matchesLeft);

    setMatches(prevMatches => prevMatches - matchesToTake);
    setComputerMatches(prevComputerMatches => prevComputerMatches + matchesToTake);
    setTurn(Competitor.Player);
};


const checkGameOver = useCallback(() => {
  if (matches === 0) {
    if (playerMatches % 2 === 0) {
      setWinner(Competitor.Player);
    } else {
      setWinner(Competitor.Computer);
    }
  }
}, [matches, playerMatches]);


  const makeMove = useCallback((num: number) => {
    if (matches > 0 && !winner) {
      const matchesLeft = handlePlayerMove(num);
      setTimeout(() => {
        computerMove(matchesLeft);
      }, 500);
    }
   
  }, [handlePlayerMove]);


  const resetGame = () => {
    setComputerMatches(0);
    setPlayerMatches(0);
    setMatches(INITIAL_MATCHES_COUNT);
    setTurn(Competitor.Player);
    setWinner(null);
  }

  useEffect(() => {
    checkGameOver();
  },[matches]);

  

  return (
    <View className='bg-[#161622] h-full'>
    <View className='justify-center flex-1 items-center'>
      <NumberOfMatches
        numberOfMatches={matches}
        title='Matches left'
        otherStyles='mb-10'
      />
      <View className='flex-row w-full justify-between px-10'>
      <NumberOfMatches
        numberOfMatches={playerMatches}
        title='Your matches 😃'
        otherStyles=''
      />
      <NumberOfMatches 
        numberOfMatches={computerMatches}
        title='Computer matches🤖'
        otherStyles=''
      />

      </View>
      
      {winner ? (
        <View className='justify-center items-center '>
        <Text className='text-lg text-white font-bold'>{winner === Competitor.Computer ? 'Computer won!' : 'Player won!'}</Text>
        <CustomButton
          title='Reset'
          handlePress={resetGame}
          otherStyles='min-w-[115] mx-10'
        />  
        </View>
        
        
      ) : (
        <View>
          {turn === Competitor.Player ? (
            <View>
              <View className='flex-row w-full mt-10 mb-10 justify-between px-4 space-evenly'>
              <CustomButton
                title='Take 1'
                handlePress={() => {
                  makeMove(1)
                }}
                otherStyles='flex-1'
              />
              <CustomButton
                title='Take 2'
                handlePress={() => {
                  makeMove(2)
                }}
                otherStyles='flex-1 mr-2 ml-2'
              />
              <CustomButton
                title='Take 3'
                handlePress={() => {
                  makeMove(3)
                }}
                otherStyles='flex-1'
              />
            </View>
            <CustomButton
                title='Reset'
                handlePress={resetGame}
                otherStyles='min-w-[115] mx-10'
            />  
            </View>
            
          ) : (
            <Text className='text-lg text-white font-bold mt-10'>Computer is thinking...</Text>
          )}
        </View>
      )}
      </View>
      </View>   
  )
};

export default Layout;