import Accordion from "@/components/construction/Accordion/Accordion";
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import BlocksList from "@/components/Creator/LeftPanel/BlocksPanel/BlocksList/BlocksList";
import {BlockItemProps} from "@/components/Creator/LeftPanel/BlocksPanel/BlockItem/BlockItem";
import {BlockTypes} from "@/types/block-type";

export default function BlocksPanel() {
    const basicBlocks: BlockItemProps[] = [
        {name: 'Container', type: BlockTypes.CONTAINER, icon: {name: 'crop_3_2', type: 'material-outlined'}},
        {name: 'Heading', type: BlockTypes.HEADING, icon: {name: 'format_h1', type: 'material-outlined'}},
        {name: 'Text', type: BlockTypes.PARAGRAPH, icon: {name: 'format_paragraph', type: 'material-outlined'}},
        {name: 'List', type: BlockTypes.UL, icon: {name: 'list', type: 'material-outlined'}},
        {name: 'Photo', type: BlockTypes.IMAGE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Video', type: BlockTypes.VIDEO, icon: {name: 'smart_display', type: 'material-outlined'}},
        {
            name: 'Audio',
            type: BlockTypes.AUDIO,
            icon: {name: 'fa-sharp fa-light fa-waveform-lines', type: 'fontawesome'}
        },
        {name: 'Button', type: BlockTypes.BUTTON, icon: {name: 'smart_button', type: 'material-outlined'}},
        {name: 'Icon', type: BlockTypes.ICON, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'A horizontal line', type: BlockTypes.HR, icon: {name: 'fa-solid fa-horizontal-rule', type: 'fontawesome'}},
        {name: 'Quote', type: BlockTypes.QUOTE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
        {name: 'Frame', type: BlockTypes.IFRAME, icon: {name: 'fa-thin fa-code-simple', type: 'fontawesome'}},
    ];
    const embedBlocks: BlockItemProps[] = [
        {name: 'YouTube', type: BlockTypes.YOUTUBE, icon: {name: 'fa-brands fa-youtube', type: 'fontawesome'}},
        {name: 'Vimeo', type: BlockTypes.VIMEO, icon: {name: 'fa-brands fa-vimeo-v', type: 'fontawesome'}},
        {name: 'Spotify', type: BlockTypes.SPOTIFY, icon: {name: 'fa-brands fa-spotify', type: 'fontawesome'}},
        {name: 'Mapy Google', type: BlockTypes.GOOGLE_MAPS, icon: {name: 'fa-light fa-map', type: 'fontawesome'}},
        {
            name: 'Calendar Google',
            type: BlockTypes.GOOGLE_CALENDAR,
            icon: {name: 'fa-sharp fa-solid fa-calendar-days', type: 'fontawesome'}
        },
    ];
    const variableBlocks: BlockItemProps[] = [
        {name: 'Heading', type: BlockTypes.HEADING_VARIABLE, icon: {name: 'format_h1', type: 'material-outlined'}},
        {
            name: 'Text',
            type: BlockTypes.PARAGRAPH_VARIABLE,
            icon: {name: 'format_paragraph', type: 'material-outlined'}
        },
        {name: 'Photo', type: BlockTypes.IMAGE_VARIABLE, icon: {name: 'panorama', type: 'material-outlined'}},
        {name: 'Video', type: BlockTypes.VIDEO_VARIABLE, icon: {name: 'smart_display', type: 'material-outlined'}},
        {name: 'Audio', type: BlockTypes.AUDIO_VARIABLE, icon: {name: 'play_circle', type: 'material-outlined'}},
        {name: 'Icon', type: BlockTypes.ICON_VARIABLE, icon: {name: 'emoticon', type: 'material-outlined'}},
        {name: 'Quote', type: BlockTypes.QUOTE_VARIABLE, icon: {name: 'fa-duotone fa-quotes', type: 'fontawesome'}},
    ];

    return (
        <Accordion>
            <AccordionItem title="Basic">
                <BlocksList items={basicBlocks}/>
            </AccordionItem>
            <AccordionItem title="Deposition-SM">
                <BlocksList items={embedBlocks}/>
            </AccordionItem>
            <AccordionItem title="Dynamic variables">
                <BlocksList items={variableBlocks}/>
            </AccordionItem>
        </Accordion>
    )
}
