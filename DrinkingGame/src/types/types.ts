export type AnnouncementProps = {
    text: string;
    minRequiredPlayers: number;
    backgroundColor: string;
    shouldHaveNextCards: boolean;
    nextCards: AnnouncementProps[];
};

export interface GameContainerProps {
    players: Player[],
    announcementList: AnnouncementProps[]
}

export type Player = {
    name: string;
}

export interface NameInputProps {
    updatePlayerNames: (name: string, i: number, deleteInput: boolean) => void;
    id: number;
    isAutoFocus: boolean;
}
