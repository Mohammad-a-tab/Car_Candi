export function editPaths (files) {
    const allowedImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];
    const allowedVideoTypes = ["video/mp4", "video/mpg", "video/mov", "video/avi", "video/mkv"];
    let images = [];
    let videos = [];
    let pdfs = [];
    for ( const file of files) {
        if (allowedImageTypes.includes(file.mimetype)) {
            const path = file.path.replace(/\\/g, "/")
            images.push(path);
        }
        else if (allowedVideoTypes.includes(file.mimetype)) {

        }
        else if (file.mimetype === 'application/pdf') {

        }
    }
  
    
}
export function removeFieldEmpty(obj: object) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}