import React, { useEffect, useState } from 'react'
import {Box, Input, InputField, InputSlot, InputIcon, Text, Icon, Image, FavouriteIcon, ScrollView} from '@gluestack-ui/themed'
import { FlatList, Pressable } from 'react-native';
import { ListRenderItem } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import { AddFavorite } from '@/pokeComponent/Favorite';


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
    "id" : "4",
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
    const glob = useGlobalSearchParams();
    const local = useLocalSearchParams();

    console.log("Local:", local, "Global:", glob);
    const pokemonId = local.pokeId ?? 1;
    const [pokeData, setPokeData] = useState(DATA);

    // {
    //     "name": "squirtle",
    //     "url": "https://pokeapi.co/api/v2/pokemon/7/"
    // }

    const favData = {"name": pokeData.name, "url": `https://pokeapi.co/api/v2/pokemon/${pokeData.id}/`};
    console.log("favData", favData);
    const favDataString = JSON.stringify(favData);
    console.log("favDataString", favDataString);

    async function fetchData() {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const json = await response.json();
        //   console.log("fetch detail", json);
          setPokeData(json);
        } catch (e) {
            console.error("fetch error", e);
        }
    }

    const abilityNames = pokeData.abilities.map(ability => ability.ability.name);

    const sprites: any = pokeData?.sprites;
    // console.log(sprites);
    const imageElements: JSX.Element[] = [];
    for (const key in sprites) {
      if (sprites.hasOwnProperty(key) && key !== 'other' && key !== 'versions' && sprites[key] !== null) {
        const imageUrl = sprites[key];
        // console.log(imageUrl);
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

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <Box flex={1}>
        <ScrollView>
        <Box aspectRatio={1} w={'100%'}>
                <Image 
                    size='full'
                    source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}}
                    // source={{uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"}}
                    alt={'image'}
                />
        </Box>
        <Box paddingHorizontal={8} pb={30} bgColor='white' >
            <Box flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Text size='2xl' color='black' fontWeight='700'>{capitalize(pokeData.name)}</Text>
                <Pressable onPress={()=>{AddFavorite(favDataString)}}>
                {({ pressed }) => (
                    <Box minWidth={50} height={50} justifyContent='center' alignItems='center' opacity={pressed? 0.5 : 1}>
                        <Icon as={FavouriteIcon} size='lg'/>
                    </Box>
                )}
                </Pressable>
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