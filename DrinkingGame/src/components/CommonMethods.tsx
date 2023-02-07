import * as ScreenOrientation from 'expo-screen-orientation';
import {AnnouncementProps, SpecialAnnouncementProps} from "../types/types";

/**
 * Changes screen orientation
 *
 * @param {string} direction Target screen orientation direction. Must be either 'landscape' or 'portrait'. Default is 'portrait'
 */

export async function changeScreenOrientation(direction: string) {
    switch (direction) {
        case 'landscape':
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            break;
        case 'portrait':
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            break;
        default:
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            break;
    }
}

/**
 * Randomly generates a list of announcementProps.
 * The function follow some rules:
 * - There should be no duplicates of an object, unless it has valid objects in the 'nextCards'-list
 * - If the chosen AnnouncementProp has nextCards.length > 0, an AnnouncementProp within the nextCards-list need to be added next.
 *
 * @param {number} maxListLength Maximum length of the resulting list. Amount of AnnouncementProps in the resulting list.
 * @return {AnnouncementProps[]} A list of AnnouncementProps
 */

export const generateAnnouncementList = (maxListLength: number): AnnouncementProps[] => {

    const announcementProps: AnnouncementProps[] = require('../../cards.json');
    const result: AnnouncementProps[] = [];
    let availableNextCards: AnnouncementProps[] = [];
    const usedAnnouncements: AnnouncementProps[] = [];
    const announcementsPropsLength = findNumOfObjectsInList(announcementProps);

    // One AnnouncementProp is added to the resulting list each iteration, making sure it does not exceed the maxListLength-limit
    for (let i = 0; i < maxListLength; i++) {

        // Are all AnnouncementProps from the .json file already used?
        if (findNumOfObjectsInList(announcementProps) == usedAnnouncements.length) {
            return result;
        }

        // First iteration: set all AnnouncementProps to be available for choosing
        if (i === 0) {
            availableNextCards = [...announcementProps];
        } else {
            // If the chosen AnnouncementProp has descendant in nextCards[], one of these should be next
            availableNextCards = result[i - 1].nextCards.filter(
                announcement => !usedAnnouncements.includes(announcement)
            );
        }

        // If the chosen AnnouncementProp do not have any descendant, set all AnnouncementProps to be available for choosing
        if (availableNextCards.length === 0) {
            availableNextCards = [...announcementProps];
        }

        // -- FIND A VALID AnnouncementProp: Part 1 -- //
        // Find a AnnouncementProp that is not already used
        let selectedIndex = Math.floor(Math.random() * availableNextCards.length);
        let selectedAnnouncement = availableNextCards[selectedIndex];

        let count: number = 0;

        while (usedAnnouncements.includes(selectedAnnouncement)) {
            // Avoid infinite loop
            count += 1;
            if (count >= 50) {
                return result;
            }

            // Select a new AnnouncementProp
            selectedIndex = (selectedIndex + 1) % availableNextCards.length;
            selectedAnnouncement = availableNextCards[selectedIndex];
        }

        // -- FIND A VALID AnnouncementProp: Part 2 -- //
        // If the selected AnnouncementProp have descendants, they should be available for choosing If it turns out that the selected AnnouncementProp have descendants
        // but none of them are valid (all of them are already used), add the selected AnnouncementProp to the used-list, skip the iteration and start over.

        // Iterate over the nextCards lists, and determine whether objects are valid they are valid or not
        if (selectedAnnouncement.shouldHaveNextCards) {
            let validAnnouncements: AnnouncementProps[] = selectedAnnouncement.nextCards.filter(
                announcement => !usedAnnouncements.includes(announcement)
            )

            let skipToNextIteration: boolean = false;
            let usedAnnouncement1: AnnouncementProps = {} as AnnouncementProps;
            let usedAnnouncement2: AnnouncementProps = {} as AnnouncementProps;

            if (validAnnouncements.length === 0) {
                // The chosen AnnouncementProp should have next cards, but all of them are already used
                usedAnnouncements.push(selectedAnnouncement);
                i -= 1;
                continue;
            } else {
                // Some children in nextCards are available. Check if their children are available as well
                for (let a = 0; a < selectedAnnouncement.nextCards.length; a++) {

                    let childAnnouncement = selectedAnnouncement.nextCards[a];

                    if (childAnnouncement.shouldHaveNextCards) {
                        if (childAnnouncement.nextCards.length > 0) {
                            let childList = childAnnouncement.nextCards.filter(
                                childChildAnnouncement => !usedAnnouncements.includes(childChildAnnouncement)
                            )
                            if (childList.length === 0) {
                                // The chosen AnnouncementProp have no valid descendants, hence skip to the next iteration
                                usedAnnouncement1 = selectedAnnouncement;
                                usedAnnouncement2 = childAnnouncement;
                                skipToNextIteration = true;
                            } else {
                                skipToNextIteration = false;
                                break;
                            }
                        }
                    } else {
                        if (!usedAnnouncements.includes(childAnnouncement)) {
                            // The AnnouncementProp have at least one valid descendant
                            skipToNextIteration = false;
                            break;
                        }
                    }
                }
            }

            if (skipToNextIteration) {
                // In some cases we need to skip the iteration and add the selected non-valid AnnouncementProps to the used-list
                i -= 1;
                if (usedAnnouncement1 && usedAnnouncement2) {
                    usedAnnouncements.push(usedAnnouncement1);
                    usedAnnouncements.push(usedAnnouncement2);
                }
                continue;
            }

        }

        // --- ADD THE AnnouncementProp TO THE RESULT LIST --- //
        if (selectedAnnouncement.nextCards.length === 0) {
            usedAnnouncements.push(selectedAnnouncement);
        }
            result.push(selectedAnnouncement);

        // Error handling
        if (result.length === maxListLength) {
            break;
        }

        // Error handling
        if (usedAnnouncements.length === announcementsPropsLength) {
            break;
        }
    }

    return result;

};



/**
 * Find the total number of AnnouncementProp-objects in a list. The function can search 3-levels in the hierarchy
 *
 * @param {AnnouncementProps[]} announcementProps The list to search
 * @return {number} Number of AnnouncementProp-objects
 */
const findNumOfObjectsInList = (
    announcementProps: AnnouncementProps[]
): number => {

    let numOfObjects: number = 0;

    announcementProps.forEach(a => {
        numOfObjects += 1;
        if (a.shouldHaveNextCards) {
            a.nextCards.forEach(b => {
                numOfObjects += 1;
                if (b.shouldHaveNextCards) {
                    b.nextCards.forEach(
                        () => numOfObjects += 1
                    )
                }
            })
        }
    })

    return numOfObjects;
}

/**
 * Add a "special announcement" to a list of announcements.
 * - An announcement is considered "special" when its descendants should not come right after it, but rather come e.g 5 announcements later.
 *
 * @param {SpecialAnnouncementProps} specialAnnouncement - The special announcement to add.
 * @param {SpecialAnnouncementProps[]} announcementList - The list that we want to add the special announcement to.
 *
 * @return {AnnouncementProps[]} Updated / modified list of announcements.
 */
export const addSpecialAnnouncementToList = (specialAnnouncement: SpecialAnnouncementProps, announcementList: AnnouncementProps[]): AnnouncementProps[] => {
    let isValidIndex: boolean = false;
    let hasNoMoreDescendants: boolean = false;
    let preferredIndexesIndex: number = 0; // Index used in preferredIndexes
    let preferredIndexes: number[] = (specialAnnouncement.preferredPlacementIndexes ? specialAnnouncement.preferredPlacementIndexes : [0, 0, 0]) // Preferred indexes for the special announcement and its descendants

    let announcementListIndex: number = preferredIndexes[preferredIndexesIndex]; // Placement index - in announcemnetList, where do we want to add the new special announcement?

    let count: number = 0;
    let announcementToAdd: SpecialAnnouncementProps = specialAnnouncement;

    while (!hasNoMoreDescendants) {
        // Avoid infinite loop
        count += 1;
        if (count >= 100 ) {
            break;
        }
        // Find a valid index to add the announcement
        while (!isValidIndex) {
            if (!announcementList[announcementListIndex].shouldHaveNextCards) {
                // Add the announcement to the list at the correct index
                const convertedAnnouncementToAdd: AnnouncementProps = {
                    text: announcementToAdd.text,
                    minRequiredPlayers: announcementToAdd.minRequiredPlayers,
                    backgroundColor: announcementToAdd.backgroundColor,
                    shouldHaveNextCards: announcementToAdd.shouldHaveNextCards,
                    nextCards: announcementToAdd.nextCards
                }
                announcementList.splice(announcementListIndex + 1, 0, convertedAnnouncementToAdd);
                isValidIndex = true;
            } else {
                announcementListIndex += 1;
            }

            // Avoid infinite loop
            count += 1;
            if (count >= 70 ) {
                break;
            }
        }

        // TODO: Make it so that the next announcement is randomly chosen. Now, it only chooses the first one in nextCards
        if (announcementToAdd.shouldHaveNextCards && announcementToAdd.nextCards.length > 0) {
            announcementToAdd = announcementToAdd.nextCards[0];
            isValidIndex = false;
            preferredIndexesIndex += 1;

            // Error handling. Check if the first announcement ended up with a higher index than what the descendant should have
            if (announcementListIndex >= preferredIndexes[preferredIndexesIndex]) {
                announcementListIndex += 5;
            } else {
                announcementListIndex = preferredIndexes[preferredIndexesIndex];
            }

            // Error handling
            if (announcementList.length < announcementListIndex) {
                console.log("Error: announcementList.length < listIndex. addSpecialAnnouncementToList");
                //return announcementList;
                throw new Error("listIndex is too big");
            }
        } else {
            hasNoMoreDescendants = true;
        }
    }

    return announcementList;

}