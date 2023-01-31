export type AnnouncementProps = {
    text: string;
    minRequiredPlayers: number;
    backgroundColor: string;
    nextCards: AnnouncementProps[];
};

export type PlayerList = {
    players: Player[]
}

export type Player = {
    name: string;
}