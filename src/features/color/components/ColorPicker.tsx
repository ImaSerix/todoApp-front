import {CSSProperties, useEffect, useRef} from "react";
import {useAppSelector} from "../../../hooks.ts";
import {selectAllColors} from "../redux/colorSlice.ts";

interface ColorPickerProps {
    colorPicked: (colorId: string) => void,
    colorPickerVisible: boolean,
    setColorPickerVisible: (visible: boolean) => void,
}

const ColorPicker = ({colorPicked, colorPickerVisible, setColorPickerVisible}: ColorPickerProps) => {
    const availableColors = useAppSelector(selectAllColors);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
            setColorPickerVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return <div ref={colorPickerRef} className={`color-picker ${colorPickerVisible ? 'color-picker--visible' : 'color-picker--hidden'}`}>
        {
            availableColors.map((color) => (
                <span
                    key = {color.id}
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