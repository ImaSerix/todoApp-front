import {Color} from "./types.ts";
import {avaibleColors} from "./avaibleColors.ts";
import {CSSProperties} from "react";

interface ColorPickerProps {
    colorPicked: (color: Color) => void,
}


const ColorPicker = ({colorPicked}: ColorPickerProps) => {
    return <div className="color-picker">
        {avaibleColors.map((color) => (<span
            className={'color-picker__color'}
            onClick={() => colorPicked(color)}
            style={{
                '--color-color-red': color.red,
                '--color-color-green': color.green,
                '--color-color-blue': color.blue,
                '--color-color-opacity': color.opacity,
            } as CSSProperties}></span>))}
    </div>
}

export default ColorPicker;