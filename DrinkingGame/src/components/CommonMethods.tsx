import * as ScreenOrientation from 'expo-screen-orientation';

// Helper method to change screen orientation
// Params: "direction". "landscape" or "portrait"
// Import it using: "import { changeScreenOrientation } from "../components/CommonMethods"
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