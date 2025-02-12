import {Color} from "./types.ts";
import {CSSProperties} from "react";
import {useAppSelector} from "../../hooks.ts";

interface ColorPickerProps {
    colorPicked: (color: Color) => void,
}


const ColorPicker = ({colorPicked}: ColorPickerProps) => {
    const availableColors = useAppSelector(state => state.todo.colors.data);
    const colorKeys = Object.keys(colorPicked).map(key => Number(key));

    return <div className="color-picker">
        {
            colorKeys.map((key) => {
                const color = availableColors[key];
                return <span
                    className={'color-picker__color'}
                    onClick={() => colorPicked(color)}
                    style={{
                        '--color-color-red': color.red,
                        '--color-color-green': color.green,
                        '--color-color-blue': color.blue,
                        '--color-color-opacity': color.opacity,
                    } as CSSProperties}></span>
            })}
    </div>
}

export default ColorPicker;