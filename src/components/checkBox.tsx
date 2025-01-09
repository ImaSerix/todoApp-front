export interface iCheckBox{
    id: number,
    text: string,
    completed: boolean,
}

interface iCheckBoxProps extends iCheckBox{
    onClick: (id: number, taskStatus: boolean) => void,
}

const CheckBox = ({ id, text, completed, onClick }: iCheckBoxProps) => {
    return <div className="check-box">
        <label> {text} </label>
        <input type={"checkbox"} onChange={() => onClick (id, completed)} checked={completed}/>
    </div>
}

export default  CheckBox;
