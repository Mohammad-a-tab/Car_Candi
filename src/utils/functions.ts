import { ImageInfo } from "../interface/image-info.interface";

export function editPaths (contents, ikcoDTO): void {
    let paths = [];
    for (const content of contents) {
        const path = content.path.replace(/\\/g, '/');
        paths.push(path);
    }
    ikcoDTO.images = paths;
    console.log(ikcoDTO);
    
}
export function removeFieldEmpty(obj: object) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}