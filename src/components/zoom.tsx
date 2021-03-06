import React from "react"
import Button from "./Button";
import NavigateTo from "./NavigateTo"
import { copyTextToClipboard } from "../utils";

type ZoomRoom = {
    url: string;
    name: string;
}

const ZoomRooms: ZoomRoom[] = [
    { url: 'https://us02web.zoom.us/j/3120354462?pwd=L0NkaENKczBMdE9MOHRaSHBsbkZvZz09', name: 'Deathwishes Standup'},
    { url: 'https://us02web.zoom.us/j/4088834592?pwd=WDlZb21mRG9FQnB1aVU2SW1Lck92Zz09', name: 'The Saucepan'},
    { url: 'https://us02web.zoom.us/j/9239018218?pwd=Rk9MZkoyVHcwUnc2QTNKUnVWNU9rUT09', name: 'The Frying Pan'},
    { url: 'https://us02web.zoom.us/j/3120354462?pwd=L0NkaENKczBMdE9MOHRaSHBsbkZvZz09', name: 'Mobbing Room' },
    { url: 'https://us02web.zoom.us/j/2761908143?pwd=SUhENzQ5eit5bGF6cklrdFFvRzI4UT09', name: 'The Wild West' },
    { url: 'https://us02web.zoom.us/j/85435981450?pwd=3DK2hhNm5vVXZYNS9wcGJRcnZWMVJidz09&sa', name: 'Bored Room' },
    { url: 'https://us02web.zoom.us/j/82816579061?pwd=cXdMa1VwRzc5Ykc3NUI5L0lCQ0hwQT09', name: 'Huddles & Cuddles' }
];

export const Zoom = () => {
    return (
        <>
        <h3 className="font-bold">Meeting/Pairing Time!</h3><p>No more will you say 'please send me the Zoom link'!</p><div className="container pb-4 py-2 grid grid-flow-row grid-cols-3 gap-4 w-full">
            {ZoomRooms.map((room: ZoomRoom) => (
                <div className="flex w-full" key={room.name}>
                    <Button key={room.name} text={room.name} onClickHandler={() => NavigateTo(room.url, true)} className="w-full h-8 rounded-r-none"/>
                    <img src="/assets/copy-icon.svg" className="w-8 h-8 p-2 rounded-r-sm inline hover:cursor-pointer bg-pink-500 text-white fill-white" onClick={() => copyTextToClipboard(room.url)}/>
                </div>
            ))}
        </div>
        </>
    )
}