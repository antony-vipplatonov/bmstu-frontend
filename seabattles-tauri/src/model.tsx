export interface ship {
    id: number
    name: string
	weapon: string
	armoring: string
    status: string
	year: number
	displacement: number
	length: number
	speed: number
    image_src: string
}

export interface Ships {
    draftID: number
    ships: ship[]
}


export const mockShips: Ships = 
{
	"ships": [
		{
			"id": 5,
			"name": "Дзуйкаку",
			"weapon": "Зенитное вооружение корабля: 16 x 127-мм",
			"armoring": "бронирование: до 21,5 см",
			"year": 1941,
			"displacement": 30000.0,
			"length": 237.0,
			"speed": 34.0,
			"status": "действует",
			"image_src": ""
		},
		{
			"id": 3,
			"name": "Нати",
			"weapon": "5 × 2 — 200-мм",
			"armoring": "102 мм",
			"year": 1928,
			"displacement": 15933.0,
			"length": 203.76,
			"speed": 35.5,
			"status": "действует",
			"image_src": "https://war-book.ru/wp-content/uploads/2019/03/00032632.jpg"
		},
		{
			"id": 2,
			"name": "Пенсильвания",
			"weapon": "4 × 3 — 356-мм и 22 × 1 — 127-мм",
			"armoring": "343 мм",
			"year": 1916,
			"displacement": 31400.0,
			"length": 185.4,
			"speed": 21.0,
			"status": "действует",
			"image_src": "https://upload.wikimedia.org/wikipedia/commons/c/cd/USS_Pennsy_BB-38_1934.jpg"
		}
	],
	"draftID": 0
}