import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { CommunityListItem } from '../../contracts/communityList';


interface IProps {
    item: CommunityListItem;
    onClose: () => void;
}

export const CommunityCardModal: Component<IProps> = (props: IProps) => {

    return (
        <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{props.item.name}</ModalHeader>
            <ModalBody>
                <p>{props.item.desc}</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    );
}
