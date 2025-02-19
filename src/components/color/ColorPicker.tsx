import {CSSProperties} from "react";
import {useAppSelector} from "../../hooks.ts";
import {selectAllColors} from "../../features/color/colorSlice.ts";

//Todo Может быть выделять уже выбранное значение?

interface ColorPickerProps {
    colorPicked: (colorId: string) => void,
}


const ColorPicker = ({colorPicked}: ColorPickerProps) => {
    const availableColors = useAppSelector(selectAllColors);

    return <div className="color-picker">
        {
            availableColors.map((color) => (
                <span
                    className={'color-picker__color'}
                    onClick={() => colorPicked(color.id)}
                    style={{
                        '--color-color-red': color.red,
                        '--color-color-green': color.green,
                        '--color-color-blue': color.blue,
                        '--color-color-opacity': color.opacity,
                    } as CSSProperties}></span>
            ))}
    </div>
}

export default ColorPicker;