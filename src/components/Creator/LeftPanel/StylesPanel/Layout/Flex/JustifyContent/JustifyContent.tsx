import LayoutValues from "@/components/Creator/LeftPanel/StylesPanel/Layout/LayoutValues/LayoutValues";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function JustifyContent(props: Props) {
    const justifyContentValues = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
    const label = 'The direction of arrangement of elements';
    return (
        <LayoutValues subItemsCount={3} onChange={props.onChange} availableValues={justifyContentValues} label={label}
                      propName="justifyContent"/>
    )
}
