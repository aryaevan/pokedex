import React, { useState } from 'react'
import {Box, Input, InputField, InputSlot, InputIcon, Text, Icon, Image, FavouriteIcon} from '@gluestack-ui/themed'
import { FlatList, Pressable } from 'react-native';
import { ListRenderItem } from 'react-native';
import { Link } from 'expo-router';


interface listItf{
    name: string;
    url: string;
}
const DATA = {
    "name" : "charmander",
    "sprites": {
        "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
        "back_female": null,
        "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
        "back_shiny_female": null,
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        "front_female": null,
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
        "front_shiny_female": null,
        "other": {
            "dream_world": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
                "front_female": null
            },
            "home": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
                "front_female": null,
                "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/4.png",
                "front_shiny_female": null
            },
            "official-artwork": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
                "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png"
            },
            "showdown": {
                "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/4.gif",
                "back_female": null,
                "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/4.gif",
                "back_shiny_female": null,
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif",
                "front_female": null,
                "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/4.gif",
                "front_shiny_female": null
            }
        },
    },
    "abilities": [
        {
            "ability": {
                "name": "blaze",
                "url": "https://pokeapi.co/api/v2/ability/66/"
            },
            "is_hidden": false,
            "slot": 1
        },
        {
            "ability": {
                "name": "solar-power",
                "url": "https://pokeapi.co/api/v2/ability/94/"
            },
            "is_hidden": true,
            "slot": 3
        }
    ],
};

function capitalize(str: string){
    return str.toLowerCase().replace(/\b\w/g, function(char) {
        return char.toUpperCase();
      });
}

export default function DetailScreen() {
    const [pokeData, setPokeData] = useState(DATA);
  return (
    <Box flex={1}>
      <Box aspectRatio={1} w={'100%'} bgColor='green'>
            {/* <Image 
                size='full'
                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png`}}
                alt={'image'}
            /> */}
      </Box>
      <Box paddingHorizontal={4} >
        <Box p={4} flexDirection='row' justifyContent='space-between' alignItems='center'>
            <Text size='2xl'>{capitalize(pokeData.name)}</Text>
            <Icon as={FavouriteIcon} size='lg' />
        </Box>
        <Box>
            <Text>Sprite Gallery</Text>
        </Box>
        <Box>
            <Text>Abilities</Text>
        </Box>
      </Box>
    </Box>
  )
}