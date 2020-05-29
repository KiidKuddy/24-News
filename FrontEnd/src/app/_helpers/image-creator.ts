export class ImageCreator {
    static createImageFromBlob(blob: Blob, returnCreatedImageCallback: any) {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
            const createdImage = reader.result;
            returnCreatedImageCallback(createdImage);
            },
            false
        );

        if (blob) {
            reader.readAsDataURL(blob);
        }
    }
}