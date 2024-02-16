import {useDispatch, useSelector} from "react-redux";
import Accordion from "@/components/construction/Accordion/Accordion";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import NoBlock from "@/components/Creator/LeftPanel/NoBlock/NoBlock";
import {shouldShowStyleForBlockType} from "@/helpers/block-style-type";
import StyleStateSwitch from "@/components/Creator/LeftPanel/StylesPanel/StyleStateSwitch/StyleStateSwitch";
import Size from "@/components/Creator/LeftPanel/StylesPanel/Size/Size";
import {useCallback} from "react";
import {setStylesProperty} from "@/store/structureSlice";
import {SetStylesPropertyPayloadInterface} from "@/store/functions/block";
import BorderRadius from "@/components/Creator/LeftPanel/StylesPanel/BorderRadius/BorderRadius";
import Padding from "@/components/Creator/LeftPanel/StylesPanel/Padding/Padding";
import Margin from "@/components/Creator/LeftPanel/StylesPanel/Margin/Margin";
import Layout from "@/components/Creator/LeftPanel/StylesPanel/Layout/Layout";
import Border from "@/components/Creator/LeftPanel/StylesPanel/Border/Border";
import Quote from "@/components/Creator/LeftPanel/StylesPanel/Quote/Quote";
import Image from "@/components/Creator/LeftPanel/StylesPanel/Image/Image";
import TextColumns from "@/components/Creator/LeftPanel/StylesPanel/TextColumns/TextColumns";
import Text from "@/components/Creator/LeftPanel/StylesPanel/Text/Text";
import TextShadow from "@/components/Creator/LeftPanel/StylesPanel/TextShadow/TextShadow";
import Background from "@/components/Creator/LeftPanel/StylesPanel/Background/Background";
import Filter from "@/components/Creator/LeftPanel/StylesPanel/Filter/Filter";
import Animations from "@/components/Creator/LeftPanel/StylesPanel/Animations/Animations";

export default function StylesPanel() {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const dispatch = useDispatch();
    const updateStyle = useCallback((data: SetStylesPropertyPayloadInterface) => {
        dispatch(setStylesProperty(data));
    }, [dispatch]);
    const styleChange = (value: string, property: string) => {
        updateStyle({
            property,
            value: value || null,
            styleState,
            rwd,
            blockId: selectedBlock.id,
        })
    }
    const sections: [id: string, component: JSX.Element][] = [
        ['layout', <AccordionItem key={'layout'} title="Arrangement of elements"><Layout onChange={styleChange}/></AccordionItem>],
        ['background', <AccordionItem key={'background'} title="Background"><Background onChange={styleChange}/></AccordionItem>],
        ['size', <AccordionItem key={'size'} title="Dimensions"><Size onChange={styleChange}/></AccordionItem>],
        ['image', <AccordionItem key={'image'} title="Picture"><Image onChange={styleChange}/></AccordionItem>],
        ['border', <AccordionItem key={'border'} title="Frame"><Border onChange={styleChange}/></AccordionItem>],
        ['border-radius', <AccordionItem key={'border-radius'} title="Rounding the corners"><BorderRadius onChange={styleChange}/></AccordionItem>],
        ['text', <AccordionItem key={'text'} title="Text style"><Text onChange={styleChange}/></AccordionItem>],
        ['text-columns', <AccordionItem key={'text-columns'} title="Text columns"><TextColumns onChange={styleChange}/></AccordionItem>],
        ['text-shadow', <AccordionItem key={'text-shadow'} title="Text shadow"><TextShadow onChange={styleChange}/></AccordionItem>],
        ['quote', <AccordionItem key={'quote'} title="Quote"><Quote onChange={styleChange}/></AccordionItem>],
        ['margin', <AccordionItem key={'margin'} title="External margins"><Margin onChange={styleChange}/></AccordionItem>],
        ['padding', <AccordionItem key={'padding'} title="Internal margins"><Padding onChange={styleChange}/></AccordionItem>],
        ['filter', <AccordionItem key={'filter'} title="Filters"><Filter onChange={styleChange}/></AccordionItem>],
        ['animations', <AccordionItem key={'animations'} title="Animations"><Animations onChange={styleChange}/></AccordionItem>],
    ]
    const canShow = ([id,c]) => {
        return shouldShowStyleForBlockType(selectedBlock.type, id);
    }
    const getComponent = ([id, component]) => component;
    const getSections = () => sections.filter(canShow).map(getComponent);
    return (
        <div>
            {selectedBlock
                ? (<>
                    <StyleStateSwitch/>
                    <Accordion>
                        {getSections()}
                    </Accordion>
                </>)
                : <NoBlock/>
            }
        </div>
    )
}
