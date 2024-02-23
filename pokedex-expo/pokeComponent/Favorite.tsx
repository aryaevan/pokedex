// import { storage } from "./Storage"
    // storage.getString('favlist');
    // storage.set('favlist', value);
    // storage.delete('username')
    // storage.getAllKeys();
    // storage.clearAll()

import AsyncStorage from '@react-native-async-storage/async-storage';

const setFav = async (value:string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('favlist', jsonValue);
      return true;
    } catch (e) {
      // handle error
      return false;
    }
  };

const getString = async (key?:string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key ?? 'favlist');
        console.log("jsonValue", jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e){
        // handle error
        return false;
    }
}

type FavData = {
    name: string;
    url: string;
  };

// export async function AddFavorite({ id, data }: { id: string | string[], data?: string }){
export async function AddFavorite(favData:string){
    // console.log("ADD Favorite Function", favData);

    // const favDataJson = JSON.parse(favData);

    // const existingList:string[] = await getString();
    // console.log("existing favorite list",existingList);
    // console.log("insert data", favDataJson);
    
    // existingList.push(favDataJson);
    // console.log("updated list", existingList);
    // const updatedList = JSON.stringify(existingList);
    // console.log("stringed update list:",updatedList);
    // setFav(updatedList);

    console.log("ADD Favorite Function", favData);
    
    const favDataJson: FavData = JSON.parse(favData);
    
    let existingList: FavData[] = [];
    existingList = await getString();
    console.log("existing favorite list", existingList);
    
    existingList.push(favDataJson);
    console.log("updated list", existingList);
    
    const updatedList = JSON.stringify(existingList);
    console.log("stringed update list:", updatedList);
    
    await setFav(updatedList);




}