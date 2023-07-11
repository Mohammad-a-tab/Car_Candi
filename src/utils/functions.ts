export function editPathImages (images, IkcoDto) {
    let paths = [];
    for (const image of images) {
        const path = image.path.replace(/\\/g, '/');
        paths.push(path);
    }
    IkcoDto.images = paths;
}
export function removeFieldEmpty(obj) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}