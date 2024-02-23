import React, {useState, useEffect} from 'react'
import {Box, Input, InputField, InputSlot, InputIcon, Text, SearchIcon, Image} from '@gluestack-ui/themed'
import { ActivityIndicator, FlatList, Pressable } from 'react-native';
import { ListRenderItem } from 'react-native';
import { Link } from 'expo-router';

interface Pokemon {
  name: string;
  url: string;
}

const renderItem: ListRenderItem<Pokemon> = ({ item }) => {
    let pokeId=0;
    const lastNumber = item.url.split('/').filter((part: any) => !!part).pop();
    if (lastNumber && !isNaN(parseInt(lastNumber))) {
        pokeId = parseInt(lastNumber);
        // console.log(pokeId);
    }

    // return <Link href="/detail" asChild>
    return <Link
        href={{pathname: "/detail/[pokeId]", params: { pokeId: pokeId }}}
        asChild
        >

    <Pressable
    style={{
        width: '50%', // Each item takes up 50% of the width
        padding: 4, // Padding on the left, right, and between columns
        
    }}
>
    <Box
        style={{
            // aspectRatio: 1, // 1:1 aspect ratio
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4
        }}
    >
        <Box aspectRatio={1} w={'100%'}>
            <Image 
                size='full'
                // source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`}}
                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}}
                alt={item.name}
            />
        </Box>
        <Text>{item.name}</Text>
    </Box>
    
</Pressable>
</Link>
}

export default function index() {

  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
            const data = await response.json();
            setPokeData((prevData) => [...prevData, ...data.results]);
            setOffset((prevOffset) => prevOffset + 20);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    fetchData();
}, [offset]);
  return (
    <Box flex={1} padding={4}>
      
      <Box padding={4}>
      <Input backgroundColor='white' borderColor='gray'>
          <InputSlot pl='$3'>
            <InputIcon as={SearchIcon}/>
          </InputSlot>
          <InputField
            placeholder="Search..."
          />
      </Input>
      </Box>

      <FlatList
        data={pokeData}
        renderItem={renderItem}
        keyExtractor={(item:any) => item.url}
        numColumns={2}onEndReachedThreshold={0.1}
        onEndReached={() => {
            if (!loading) {
                // Load more data when reaching the end
                // Assuming a limit of 20 results per page
                setOffset(offset + 20);
            }
        }}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
    </Box>
  )
}