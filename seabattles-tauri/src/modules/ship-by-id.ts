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


const filterShipDataById = (shipArray: Ship[], idFilter: number): Ship | undefined => {
    return shipArray.find(ship => ship.id === idFilter);
};


export const shipById = async (id = ''): Promise<Ship> =>{
    return fetch(`./../../api/seabattles/${id}/`)
        .then((response) => response.json())
        .catch(()=> (filterShipDataById(mockShips['ships'], Number(id))))
}