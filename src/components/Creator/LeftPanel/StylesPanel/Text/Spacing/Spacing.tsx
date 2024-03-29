import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function Spacing(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [letterSpacing, setLetterSpacing] = useState('');
    const [wordSpacing, setWordSpacing] = useState('');
    const units: Units[] = ['px', 'pt', 'em', 'rem'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['letterSpacing', 'wordSpacing'],
        ) as any;
        setLetterSpacing(style.letterSpacing);
        setWordSpacing(style.wordSpacing);
    }, [selectedBlock, rwd, styleState])

    return (
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Exploding letters" value={letterSpacing}
                                    onChange={e => props.onChange(e, 'letterSpacing')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Spreading words" value={wordSpacing}
                                    onChange={e => props.onChange(e, 'wordSpacing')}/>
                </div>
            </div>
    )
}
