import {Modal, ModalHeader, ModalProps} from "@/components/construction/Modal/Modal";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

export default function HelpModal(props: ModalProps) {
    return (
        <Modal opened={props.opened} onClose={props.onClose}>
            <ModalHeader>Help</ModalHeader>
            <Tabs>
                <TabList>
                    <Tab>Units-Description</Tab>
                </TabList>

                <TabPanel>
                    <table>
                        <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>cm</td>
                            <td>centimeters</td>
                        </tr>
                        <tr>
                            <td>mm</td>
                            <td>millimeters</td>
                        </tr>
                        <tr>
                            <td>in</td>
                            <td>all (1in = 96px = 2.54cm)</td>
                        </tr>
                        <tr>
                            <td>px</td>
                            <td>pixels(1px = 1/96th of 1in)</td>
                        </tr>
                        <tr>
                            <td>pt</td>
                            <td>points (1pt = 1/72 of 1in)</td>
                        </tr>
                        <tr>
                            <td>pc</td>
                            <td>peaks (1pc = 12 pt)</td>
                        </tr>
                        <tr>
                            <td>em</td>
                            <td>relative to the element's font size (2em means 2 times the size of the current onefonts)
                            </td>
                        </tr>
                        <tr>
                            <td>rem</td>
                            <td>relative to the font size of the main page element</td>
                        </tr>
                        <tr>
                            <td>vw</td>
                            <td>% of browser window width</td>
                        </tr>
                        <tr>
                            <td>vh</td>
                            <td>% of browser window height</td>
                        </tr>
                        <tr>
                            <td>vmin</td>
                            <td>% smaller browser window size</td>
                        </tr>
                        <tr>
                            <td>vmax</td>
                            <td>% of the larger browser window size</td>
                        </tr>
                        <tr>
                            <td>%</td>
                            <td>% relative parent dimensions</td>
                        </tr>
                        </tbody>
                    </table>
                </TabPanel>
            </Tabs>
        </Modal>
    );

}
