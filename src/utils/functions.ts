import { ImageInfo } from "../interface/image-info.interface";

export function editPathImages (images: Array<ImageInfo>, ikcoDTO): void {
    let paths = [];
    for (const image of images) {
        const path = image.path.replace(/\\/g, '/');
        paths.push(path);
    }
    ikcoDTO.images = paths;
}
export function removeFieldEmpty(obj: object) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}