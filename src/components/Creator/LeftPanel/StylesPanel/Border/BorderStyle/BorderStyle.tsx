import {useEffect, useState} from "react";
import {Option, Select} from "@/components/construction/Select";
import style from "./BorderStyle.module.scss"

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function BorderStyle(props: Props) {
    const propsValue = props.value;
    const [value, setVal] = useState('');

    useEffect(() => {
        setVal(propsValue);
    }, [propsValue])
    const onChange = (val) => {
        setVal(val);
        props.onChange(val);
    }
    const styleValues = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']
    return (
        <Select onChange={onChange} label="Choose a style">
            <Option value="none">None</Option>
            {styleValues.map(val => <Option value={val} key={val} selected={val === value}>
                <div className={style.optionStyle} style={{borderStyle: val}}/>
            </Option>)}
        </Select>
    )
}
