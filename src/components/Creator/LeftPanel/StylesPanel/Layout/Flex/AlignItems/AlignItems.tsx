import LayoutValues from "@/components/Creator/LeftPanel/StylesPanel/Layout/LayoutValues/LayoutValues";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function AlignItems(props: Props) {
    const alignItemsValues = ['start', 'center', 'end', 'stretch'];
    const label = 'The direction of arrangement of elements';
    return (
        <LayoutValues subItemsCount={3} onChange={props.onChange} availableValues={alignItemsValues} label={label}
                      propName="alignItems"/>
    )
}
