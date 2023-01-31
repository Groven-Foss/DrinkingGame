import * as ScreenOrientation from 'expo-screen-orientation';

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