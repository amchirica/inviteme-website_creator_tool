import LayoutValues from "@/components/Creator/LeftPanel/StylesPanel/Layout/LayoutValues/LayoutValues";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function FlexWrap(props: Props) {
    const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];
    const label = 'Wrapping elements';
    return (
        <LayoutValues subItemsCount={6} onChange={props.onChange} availableValues={flexWrapValues} label={label} propName="flexWrap"/>
    )
}
