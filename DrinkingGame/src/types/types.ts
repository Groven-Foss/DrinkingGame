export type AnnouncementProps = {
    text: string;
    minRequiredPlayers: number;
    backgroundColor: string;
    shouldHaveNextCards: boolean;
    nextCards: AnnouncementProps[];
};

export interface GameContainerProps {
    players: Player[]
}

export type Player = {
    name: string;
}
export type updatePlayerNames = {
    name: string,
    i: number
}

export interface NameInputProps {
    updatePlayerNames: (name: string, i: number, deleteInput: boolean) => void,
    id: number
    key: number
}
