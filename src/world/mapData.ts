export interface NPCData {
    name: string,
    image: string,
    position: { x: number, y: number },
    text: string,
}

export interface MapDataObject {
    map: string;
    background: string;
    npcs: NPCData[],
    entrances: {
        default: [number, number];
        [name: string]: [number, number];
    };
    exits: {[name: string]: [number, number]};
}

let p: (x: number, y: number) => [number, number] = (x, y) => [x, y];

let mapData: { [mapname: string]: MapDataObject } = {
    map1: {
        map: "/maps/map.png",
        background: "/maps/map_back.png",
        npcs: [
            {
                name: "John",
                image: "/npcs/npc.png",
                position: {
                    x: 1645,
                    y: 1172,
                },
                text: "Hey hey cool cat. I'm John, the coolest\nguy in these parts. Did you know you can\ntalk to cool catz like me by pressing\nEnter on a keyboard or 'Y' on a gamepad?"
                        + "\n\nAlso why you naked?",
            },
        ],
        entrances: {
            default: p(1112, 955),
            map2: p(2890, 1158),
        },
        exits: {
            map2: p(2890, 1158),
        }
    },
    map2: {
        map: "/maps/map2.png",
        background: "/maps/map2_back.png",
        entrances: {
            default: p(313, 259),
            map1: p(85, 464),
        },
        exits: {
            map1: p(85, 464),
        },
        npcs: []
    }
}

export default mapData;