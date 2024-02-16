import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useRef, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";
import BackgroundImage from "@/components/Creator/LeftPanel/StylesPanel/Background/BackgroundImage/BackgroundImage";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function Background(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [backgroundPosition, setBackgroundPosition] = useState('');
    const [backgroundPositionX, setBackgroundPositionX] = useState('');
    const [backgroundPositionY, setBackgroundPositionY] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundAttachment, setBackgroundAttachment] = useState('');
    const [backgroundSize, setBackgroundSize] = useState('');
    const [backgroundRepeat, setBackgroundRepeat] = useState('');
    const objPosXRef = useRef(null);
    const objPosYRef = useRef(null);
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['backgroundColor', 'backgroundImage', 'backgroundPosition',
                'backgroundAttachment', 'backgroundSize', 'backgroundRepeat'],
        ) as any;
        const [posX, posY] = (style.backgroundPosition || ' ').split(' ');
        setBackgroundPosition(style.backgroundPosition || '');
        setBackgroundPositionX(posX || '')
        setBackgroundPositionY(posY || '')
        setBackgroundColor(style.backgroundColor || '');
        setBackgroundImage(style.backgroundImage || '');
        setBackgroundAttachment(style.backgroundAttachment || '');
        setBackgroundSize(style.backgroundSize || '');
        setBackgroundRepeat(style.backgroundRepeat || '');
    }, [selectedBlock, rwd, styleState])
    const changeBackgroundPosition = (value: any | null) => {
        props.onChange(value, 'backgroundPosition');
    }
    const changeBackgroundPositionX = (value: any | null) => {
        setBackgroundPositionX(value);
        changeBackgroundPosition(`${value} ${objPosYRef.current.value}`)
    }
    const changeBackgroundPositionY = (value: any | null) => {
        setBackgroundPositionY(value);
        changeBackgroundPosition(`${objPosXRef.current.value} ${value}`)
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormRow}>
                    <span style={{whiteSpace: 'nowrap'}}>Background color</span>
                    <div className={styles.stylesFormField}>
                        <ColorPicker defaultValue="rgba(255,255,255,0)" value={backgroundColor}
                                     onChange={e => props.onChange(e, 'backgroundColor')}/>
                    </div>
                </div>

                <div className={styles.stylesFormRow}>
                    <div className={styles.stylesFormField}>
                        <BackgroundImage onChange={e => props.onChange(e, 'backgroundImage')} label="Background image"
                                         value={backgroundImage}/>
                    </div>
                </div>
            </div>

            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Stationary background" onChange={e => props.onChange(e, 'backgroundAttachment')}>
                        <Option value="" selected={backgroundAttachment === ''}>No</Option>
                        <Option value="fixed" selected={backgroundAttachment === 'fixed'}>Yes</Option>
                    </Select>
                </div>
            </div>

            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Background size" onChange={e => props.onChange(e, 'backgroundSize')}>
                        <Option value="" selected={backgroundSize === ''}>Automatic</Option>
                        <Option value="contain" selected={backgroundSize === 'contain'}>Match</Option>
                        <Option value="cover" selected={backgroundSize === 'cover'}>Fill in</Option>
                    </Select>
                </div>
            </div>

            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="X-axis alignment" onChange={changeBackgroundPositionX} ref={objPosXRef}>
                        <Option value="left" selected={backgroundPositionX === 'left'}>To the left</Option>
                        <Option value="center" selected={backgroundPositionX === 'center'}>To center</Option>
                        <Option value="right" selected={backgroundPositionX === 'right'}>To the right</Option>
                    </Select>
                </div>
                <div className={styles.stylesFormField}>
                    <Select label="Y-axis alignment" onChange={changeBackgroundPositionY} ref={objPosYRef}>
                        <Option value="top" selected={backgroundPositionY === 'top'}>Up</Option>
                        <Option value="center" selected={backgroundPositionY === 'center'}>Center</Option>
                        <Option value="bottom" selected={backgroundPositionY === 'bottom'}>Down</Option>
                    </Select>
                </div>
            </div>

            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Background size" onChange={e => props.onChange(e, 'backgroundRepeat')}>
                        <Option value="repeat" selected={backgroundRepeat === 'repeat'}>Horizontally and Vertically</Option>
                        <Option value="repeat-x" selected={backgroundRepeat === 'repeat-x'}>Horizontally</Option>
                        <Option value="repeat-y" selected={backgroundRepeat === 'repeat-y'}>Vertical</Option>
                        <Option value="no-repeat" selected={backgroundRepeat === 'no-repeat'}>Do not repeat</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
