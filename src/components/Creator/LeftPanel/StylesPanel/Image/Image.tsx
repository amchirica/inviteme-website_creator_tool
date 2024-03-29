import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useRef, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function Image(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [objectPosition, setObjectPosition] = useState('');
    const [objectPositionX, setObjectPositionX] = useState('');
    const [objectPositionY, setObjectPositionY] = useState('');
    const [objectFit, setObjectFit] = useState('');
    const objPosXRef = useRef(null);
    const objPosYRef = useRef(null);
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['objectFit', 'objectPosition'],
        ) as any;
        const [posX, posY] = (style.objectPosition || ' ').split(' ');
        setObjectPosition(style.objectPosition);
        setObjectPositionX(posX)
        setObjectPositionY(posY)
        setObjectFit(style.objectFit);
    }, [selectedBlock, rwd, styleState])
    const changeObjectPosition = (value: any | null) => {
        props.onChange(value, 'objectPosition');
    }
    const changeObjectPositionX = (value: any | null) => {
        setObjectPositionX(value);
        changeObjectPosition(`${value} ${objPosYRef.current.value}`)
    }
    const changeObjectPositionY = (value: any | null) => {
        setObjectPositionY(value);
        changeObjectPosition(`${objPosXRef.current.value} ${value}`)
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Size" onChange={e => props.onChange(e, 'objectFit')}>
                        <Option value="fill" selected={objectFit === 'fill'}>Automatic</Option>
                        <Option value="contain" selected={objectFit === 'contain'}>Match</Option>
                        <Option value="cover" selected={objectFit === 'cover'}>Fill in</Option>
                        <Option value="scale-down" selected={objectFit === 'scale-down'}>Scale down</Option>
                    </Select>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="X-axis alignment" onChange={changeObjectPositionX} ref={objPosXRef}>
                        <Option value="left" selected={objectPositionX === 'left'}>To the left</Option>
                        <Option value="center" selected={objectPositionX === 'center'}>Inside</Option>
                        <Option value="right" selected={objectPositionX === 'right'}>To the right</Option>
                    </Select>
                </div>
                <div className={styles.stylesFormField}>
                    <Select label="Y-axis alignment" onChange={changeObjectPositionY} ref={objPosYRef}>
                        <Option value="top" selected={objectPositionY === 'top'}>To the left</Option>
                        <Option value="center" selected={objectPositionY === 'center'}>Inside</Option>
                        <Option value="bottom" selected={objectPositionY === 'bottom'}>To the right</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
