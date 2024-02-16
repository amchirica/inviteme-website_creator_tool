import {BlockTypes} from "@/types/block-type";

export const BLOCK_VARIABLE_TYPES = [
    BlockTypes.PARAGRAPH_VARIABLE,
    BlockTypes.HEADING_VARIABLE,
    BlockTypes.IMAGE_VARIABLE,
    BlockTypes.VIDEO_VARIABLE,
    BlockTypes.AUDIO_VARIABLE,
    BlockTypes.ICON_VARIABLE,
    BlockTypes.QUOTE_VARIABLE,
];

export const BLOCK_TYPES_HUMAN_NAMES = {
    [BlockTypes.CONTAINER]: 'Container',
    [BlockTypes.PARAGRAPH]: 'Text',
    [BlockTypes.HEADING]: 'Heading',
    [BlockTypes.UL]: 'List',
    [BlockTypes.IMAGE]: 'Photo',
    [BlockTypes.VIDEO]: 'Video',
    [BlockTypes.BUTTON]: 'Button',
    [BlockTypes.ICON]: 'Icon',
    [BlockTypes.AUDIO]: 'Audio',
    [BlockTypes.YOUTUBE]: 'YouTube',
    [BlockTypes.SPOTIFY]: 'Spotify',
    [BlockTypes.VIMEO]: 'Vimeo',
    [BlockTypes.HR]: 'A horizontal line',
    [BlockTypes.QUOTE]: 'Quote',
    [BlockTypes.IFRAME]: 'Frame',
    [BlockTypes.PARAGRAPH_VARIABLE]: '$Text$',
    [BlockTypes.HEADING_VARIABLE]: '$Heading$',
    [BlockTypes.IMAGE_VARIABLE]: '$Photo$',
    [BlockTypes.VIDEO_VARIABLE]: '$Video$',
    [BlockTypes.AUDIO_VARIABLE]: '$Audio$',
    [BlockTypes.ICON_VARIABLE]: '$Icon$',
    [BlockTypes.QUOTE_VARIABLE]: '$Quote$',
    [BlockTypes.GOOGLE_MAPS]: 'Mapy Google',
    [BlockTypes.GOOGLE_CALENDAR]: 'Calendar Google',
};
