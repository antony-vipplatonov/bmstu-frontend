import {mockShips} from "../model"



export interface Ship {
    id: number
    name: string
    weapon: string
    armoring: string
    year: number
    displacement: number
    length: number
    speed: number
    status: string
    image_src: string
}

export interface ShipList {
    draftID: number
    ships: Ship[]
}

const filterShipData = (shipArray: Ship[], nameFilter: string): Ship[] => {
    return shipArray.filter(ships => ships.name.toLowerCase().includes(nameFilter.toLowerCase()));
};


export const searchInShipList = async (text=''): Promise<ShipList> =>{
    return fetch(`../../api/seabattles/?text=${text}`)
        .then((response) => response.json())
        .catch(()=> ({ships:filterShipData(mockShips['ships'], text),draftID:0}))
}