import React, {FormEvent} from "react";
import {fetchJson} from "@/helpers/fetch";
import styles from "./IconsList.module.scss";
import Icon from "@/components/construction/Icon/Icon";
import classNames from "@/helpers/classNames";
import {Option, Select} from "@/components/construction/Select";
import Input from "@/components/construction/Input/Input";

interface IconsListInterface {
    categories: {
        name: string;
        title: string
    }[];
    icons: {
        name: string;
        icon: string;
        categories: string[]
    }
}

interface IconsListPropsInterface {
    type: string;
    selectedIcon: {
        name: string;
    } | null;
    onSelectIcon: (icon: { type: string; name: string } | null) => void;
}

export default class IconsList extends React.Component<any, any> {
    constructor(props: IconsListPropsInterface) {
        super(props);
        this.state = {
            icons: [],
            iconsToShow: [],
            categories: [],
            page: 1,
            perPage: 50,
            iconsType: props.type,
            searchInputRef: React.createRef(),
            categoriesSelectRef: React.createRef(),
            iconsContainerRef: React.createRef(),
            displayShowMoreButton: true,
            selectedIcon: props.selectedIcon
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIcon?.name !== this.props.selectedIcon?.name) {
            this.setState({
                selectedIcon: this.props.selectedIcon
            });
        }
    }

    componentDidMount() {
        this.getIconsList()
            .then(({icons, categories}) => {
                this.setState({
                    icons,
                    categories
                }, () => {
                    this.searchIcons()
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.iconsToShow !== this.state.iconsToShow
            || nextState.selectedIcon?.name !== this.state.selectedIcon?.name
            || nextProps.selectedIcon?.name !== this.state.selectedIcon?.name;
    }

    private async getIconsList(): Promise<IconsListInterface> {
        return fetchJson<IconsListInterface>(`/json/icons/${this.state.iconsType}.json`);
    }

    private searchIcons( page = 1) {
        this.setState({page});
        const {
            perPage,
            searchInputRef,
            categoriesSelectRef,
            icons,
            iconsContainerRef
        } = this.state;

        const category = categoriesSelectRef.current.value;
        const search = searchInputRef.current.value;
        const foundAllIcons = icons
            .filter(icon => icon.icon.startsWith(search) || icon.name.startsWith(search))
            .filter(({categories}) => category ? categories.includes(category) : true);

        const foundIcons = foundAllIcons
            .slice(0, (page * perPage));

        if (page === 1) {
            iconsContainerRef.current.scroll({behavior: 'smooth', top: 0});
        }

        this.setState({
            page,
            iconsToShow: foundIcons,
            displayShowMoreButton: foundAllIcons.length - foundIcons.length > 0
        });
    }

    private loadNextPage() {
        this.searchIcons(this.state.page + 1);
    }

    private toggleSelected(icon) {
        if (this.state.selectedIcon?.name === icon.icon) {
            this.setState({selectedIcon: null});
            this.props.onSelectIcon(null);
        } else {
            this.setState({selectedIcon: {name: icon.icon}});
            this.props.onSelectIcon({name: icon.icon, type: this.state.iconsType});
        }
    }

    render() {
        return (<>
            <div className={styles.searchForm}>
                <Input type="text"
                       ref={this.state.searchInputRef}
                       label="Search"
                       onChange={(ev,val) => this.searchIcons()}/>

                <Select ref={this.state.categoriesSelectRef}
                        label="Category"
                        onChange={v => this.searchIcons()}>
                    <Option value="">Choose</Option>
                    {this.state.categories.map(({name, title}) => <Option key={name} value={name}>{title}</Option>)}
                </Select>
            </div>

            <div className={styles.iconsList} ref={this.state.iconsContainerRef}>

                <div className={styles.icons}>
                    {this.state.iconsToShow.map((icon, index) =>
                        <div key={icon.icon + index} className={classNames({
                            [styles.iconItem]: true,
                            [styles.selected]: this.state.selectedIcon?.name === icon.icon
                        })}
                             onClick={() => this.toggleSelected(icon)}>
                            <div className={styles.iconPreview}>
                                <Icon type={this.state.iconsType} name={icon.icon} className={styles.icon}/>
                            </div>
                            <div className={styles.iconName}>{icon.name}</div>
                        </div>)}
                </div>

                {this.state.displayShowMoreButton
                    ? <div className={styles.showMoreButton}
                           onClick={this.loadNextPage}>
                        Show more
                    </div> : ''}
            </div>
        </>)
    }
}
