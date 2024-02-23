import React, { useState, useEffect } from 'react'
import {Box, Input, InputField, InputSlot, InputIcon, Text, SearchIcon, Image} from '@gluestack-ui/themed'
import { FlatList, Pressable } from 'react-native';
import { ListRenderItem } from 'react-native';
import { Link } from 'expo-router';
import { Pokemon } from '@/pokeInterface/Interface';
import { GetFavorite } from '@/pokeComponent/Favorite';


interface listItf{
    name: string;
    url: string;
}
const DATA = [
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    },
    {
      "name": "charizard",
      "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
      "name": "squirtle",
      "url": "https://pokeapi.co/api/v2/pokemon/7/"
    }
  ];

const renderItem: ListRenderItem<listItf> = ({ item }) => {
    let pokeId=0;
    const lastNumber = item.url.split('/').filter((part: any) => !!part).pop();
    if (lastNumber && !isNaN(parseInt(lastNumber))) {
        pokeId = parseInt(lastNumber);
        // console.log(pokeId);
    }

    return <Link href={`/detail/${pokeId}`} asChild>
        
    <Pressable
    style={{
        width: '50%', // Each item takes up 50% of the width
        padding: 4, // Padding on the left, right, and between columns
        
    }}
>
    <Box
        style={{
            // aspectRatio: 1, // 1:1 aspect ratio
            borderWidth: 1,
            borderColor: 'black',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white'
        }}
    >
        <Box aspectRatio={1} w={'100%'}>
            <Image 
                size='full'
                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`}}
                alt={item.name}
            />
        </Box>
        <Text>{item.name}</Text>
    </Box>
    
</Pressable>
</Link>
}

export default function FavoriteScreen() {
  const [favData, setFavData] = useState<Pokemon[]>([]);

  async function fetch(){
    try{
      const data = await GetFavorite();
      if(data){
        setFavData(data)
      }
    }catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{
    fetch();
  },[])
  return (
    <Box flex={1} padding={4}>

      <FlatList
        data={favData}
        renderItem={renderItem}
        keyExtractor={(item:any) => item.url}
        numColumns={2}
      />
    </Box>
  )
}