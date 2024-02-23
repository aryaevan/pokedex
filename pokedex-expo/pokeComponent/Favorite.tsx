// import { storage } from "./Storage"
    // storage.getString('favlist');
    // storage.set('favlist', value);
    // storage.delete('username')
    // storage.getAllKeys();
    // storage.clearAll()

import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetFavorite = async (): Promise<Pokemon[] | null> => {
    try {
      const data = await AsyncStorage.getItem('pokemonData');
      if (data !== null) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
      return null;
    }
  };

interface Pokemon {
    name: string;
    url: string;
  }
export const AddFavorite = async (newPokemon: Pokemon): Promise<void> => {
    try {
      // Fetch existing data
      const existingData = await GetFavorite();
  
      // If data exists, modify it and save back to AsyncStorage
      if (existingData !== null) {
        const modifiedData = [...existingData, newPokemon];
        await AsyncStorage.setItem('pokemonData', JSON.stringify(modifiedData));
        console.log('New data saved to AsyncStorage:', modifiedData);
      } else {
        // If no existing data, save new data as the only item
        const newData = [newPokemon];
        await AsyncStorage.setItem('pokemonData', JSON.stringify(newData));
        console.log('New data saved to AsyncStorage:', newData);
      }
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

export const ClearFavorite = async ()=>{
    try{
        await AsyncStorage.removeItem('pokemonData');
    } catch(e)
    {
        console.error('Error clear favorite data in AsyncStorage',e);
        return false;
    }finally{
        return true;
    }

}