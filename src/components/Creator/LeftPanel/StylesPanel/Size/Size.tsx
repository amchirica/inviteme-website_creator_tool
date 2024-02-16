import {useSelector} from "react-redux";
import styles from "../StylesPanel.module.scss"
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {Units} from "@/types/units";
import {useEffect, useState} from "react";
import AspectRatio from "@/components/Creator/LeftPanel/StylesPanel/Size/AspectRatio/AspectRatio";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function Size(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [width, setWidth] = useState('');
    const [maxWidth, setMaxWidth] = useState('');
    const [minWidth, setMinWidth] = useState('');
    const [height, setHeight] = useState('');
    const [maxHeight, setMaxHeight] = useState('');
    const [minHeight, setMinHeight] = useState('');
    const [aspectRatio, setAspectRatio] = useState('');
    const widthUnits: Units[] = ['px', '%', 'vw'];
    const heightUnits: Units[] = ['px', '%', 'vh'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'aspectRatio']
        ) as any;
        setAspectRatio(style.aspectRatio || '');
        setWidth(style.width);
        setMaxWidth(style.maxWidth);
        setMinWidth(style.minWidth);
        setHeight(style.height);
        setMaxHeight(style.maxHeight);
        setMinHeight(style.minHeight);
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormField}>
                <AspectRatio value={aspectRatio} onChange={e => props.onChange(e, 'aspectRatio')}/>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={widthUnits} label="Width" value={width}
                                    onChange={e => props.onChange(e, 'width')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={heightUnits} label="Height" value={height}
                                    onChange={e => props.onChange(e, 'height')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={widthUnits} label="Minimum width" value={minWidth}
                                    onChange={e => props.onChange(e, 'minWidth')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={heightUnits} label="Minimum height" value={minHeight}
                                    onChange={e => props.onChange(e, 'minHeight')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={widthUnits} label="Maximum width" value={maxWidth}
                                    onChange={e => props.onChange(e, 'maxWidth')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={heightUnits} label="Maximum height" value={maxHeight}
                                    onChange={e => props.onChange(e, 'maxHeight')}/>
                </div>
            </div>
        </div>
    )
}
