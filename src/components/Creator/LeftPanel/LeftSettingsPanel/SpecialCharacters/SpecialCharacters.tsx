import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {setTextContent} from "@/store/structureSlice";
import {Option, Select} from "@/components/construction/Select";
import styles from "./SpecialCharacters.module.scss"
import {fetchJson} from "@/helpers/fetch";

type CharactersList = string[];
type AllCharactersList = { [key: string]: CharactersList };
const categories = ['block', 'dingbats', 'emoji', 'geometric', 'punctuation', 'letterlike', 'math-operators', 'box', 'miscs', 'arrows', 'currency',];
export default function SpecialCharacters() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);
    const [charactersList, setCharactersList] = useState<AllCharactersList>({
        block: [],
        dingbats: [],
        emoji: [],
        geometric: [],
        punctuation: [],
        letterlike: [],
        'math-operators': [],
        box: [],
        miscs: [],
        arrows: [],
        currency: [],
    })
    const [charactersCategory, setCharactersCategory] = useState('')
    const dispatch = useDispatch();
    const _setTextContent = useCallback((data) => {
        dispatch(setTextContent(data));
    }, [dispatch]);
    const addCharacter = character => {
        const content = `${selectedBlock.textContent}${character}`
        _setTextContent({content, blockId: selectedBlock?.id})
    }
    const getCharacters = () => {
        const characters = charactersList;
        categories.forEach((type) => {
            fetchJson<CharactersList>(`/json/special-characters/${type}.json`)
                .then((list: CharactersList) => {
                    characters[type] = list;
                    if (!Object.keys(characters).find(cat => !characters[cat].length)) {
                        setCharactersList({...characters})
                    }
                });
        })
    }
    useEffect(() => {
        getCharacters();
    }, [])
    const getList = () => {
        const list = charactersCategory ? (charactersList[charactersCategory]) : categories.map(cat => charactersList[cat]).flat();
        return list.map((char, index) =>
            <div onClick={e => addCharacter(char)} className={styles.singleCharacter} key={char + index}>{char}</div>)
    }
    return (
        <div>
            <Select onChange={setCharactersCategory}>
                <Option value="">All</Option>
                <Option value="block">Bloks</Option>
                <Option value="dingbats">Dingbats</Option>
                <Option value="emoji">Emoji</Option>
                <Option value="geometric">Geometric</Option>
                <Option value="punctuation">Punctuation</Option>
                <Option value="letterlike">Letters</Option>
                <Option value="math-operators">Mathematical operators</Option>
                <Option value="box">Picture Frames</Option>
                <Option value="miscs">Different</Option>
                <Option value="arrows">Arrows</Option>
                <Option value="currency">Currencies</Option>
            </Select>

            <div className={styles.list}>
                {getList()}
            </div>
        </div>
    )
}
