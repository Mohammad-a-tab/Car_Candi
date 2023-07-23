export function editPaths(files: any) {
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
            const path = file.path.replace(/\\/g, "/")
            videos.push(path);
        }
        else if (file.mimetype === 'application/pdf') {
            const path = file.path.replace(/\\/g, "/")
            pdfs.push(path);
        }
    }
  
    return {images, pdfs, videos };  
}
export function removeFieldEmpty(obj: { [x: string]: any; }) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}
export function checkFieldName(fieldName?: string, id?: string) {
    const fieldNameObject = {
        mechanical: 'mechanical',
        Injector: 'Injector',
        Engine: 'Engine',
        Air_bag: 'Air_bag',
        Wiring: 'Wiring'
    }
    if (fieldName === "مکانیکی") {
        return fieldNameObject.mechanical
    }
    else if (fieldName === "انژکتور") {
        return fieldNameObject.Injector
    }
    else if (fieldName === "موتور") {
        return fieldNameObject.Engine
    }
    else if (fieldName === "کیسه هوا") {
        return fieldNameObject.Air_bag
    }
    else if (fieldName === "سیم کشی") {
        return fieldNameObject.Wiring
    }
    
}