import React, { useState } from 'react'
import {Box, Input, InputField, InputSlot, InputIcon, Text, Icon, Image, FavouriteIcon, ScrollView} from '@gluestack-ui/themed'
import { FlatList, Pressable } from 'react-native';
import { ListRenderItem } from 'react-native';
import { Link } from 'expo-router';


interface listItf{
    name: string;
    url: string;
}

interface PokeSprites {
    sprites: {
      [key: string]: string | null;
    };
  }

const DATA = {
    "name" : "charmander",
    "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
        "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
        "back_female": null,
        "back_shiny_female": null,
        "front_female": null,
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

    const abilityNames = DATA.abilities.map(ability => ability.ability.name);

    const sprites: any = pokeData?.sprites;
    const imageElements: JSX.Element[] = [];
    for (const key in sprites) {
      if (sprites.hasOwnProperty(key) && key !== 'other' && sprites[key] !== null) {
        const imageUrl = sprites[key];
        imageElements.push(
          <Box w="50%" pb={4} key={key} alignItems='center'>
            <Box minWidth="80%" alignItems='center' borderColor='black' borderWidth={1} borderRadius={4}>
                <Image
                    source={{ uri: imageUrl }}
                    alt={'image'}
                    // style={styles.pokemonImage}
                />
            </Box>
          </Box>
        );
      }
    }

    
  return (
    <Box flex={1}>
        <ScrollView>
        <Box aspectRatio={1} w={'100%'}>
                <Image 
                    size='full'
                    source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png`}}
                    alt={'image'}
                />
        </Box>
        <Box paddingHorizontal={8} bgColor='white' >
            <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Text size='2xl' color='black' fontWeight='700'>{capitalize(pokeData.name)}</Text>
                <Box minWidth={50} height={50} justifyContent='center' alignItems='center'>
                    <Icon as={FavouriteIcon} size='lg' />
                </Box>
            </Box>
            <Box>
                <Text size='xl' color='black' fontWeight='500' pb={4}>Sprite Gallery</Text>
                <Box w='100%' flexDirection='row' flexWrap='wrap'>
                    {imageElements}
                </Box>
            </Box>
            <Box>
                <Text size='xl' color='black' fontWeight='500' pb={4}>Abilities</Text>
                    {abilityNames.map((ability, index) => (
                    <Text pl={4} key={index}>{ability}</Text>
                ))}
            </Box>
        </Box>
        </ScrollView>
    </Box>
  )
}