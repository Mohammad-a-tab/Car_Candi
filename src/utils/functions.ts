import { content } from "src/ikco/interface/content.interface";

export function editPaths(files: any) {
    try {
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
    } catch (error) {
        throw new Error(error.message);
    }
}
export function deleteInvalidPropertyInObject(data = {}, blackListFields = []): void {
    let nullishData = ["", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if(blackListFields.includes(key)) delete data[key]
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0 ) data[key] = data[key].map(item => item.trim()) 
        if(Array.isArray(data[key]) && data[key].length == 0 ) delete data[key]
        if(nullishData.includes(data[key])) delete data[key];
    });
}
export function removeFieldEmpty(obj: { [x: string]: any; }) {
    for (let key in obj) {
        if (obj[key] === null || obj[key].length === 0 || obj[key] === undefined || obj[key] === '') {
            delete obj[key];
        }
    }
    return obj
}
export function updateContentFunction(oldContent: content, content: content): content {
    try {
        if (content?.title) {
            oldContent.title = content.title;
        }
        if (content?.description) {
            oldContent.description = content.description;
        }
        if (content?.videos?.length > 0) {
            for (const video of content.videos) {
                oldContent?.videos.push(video);
            }
        }
        if (content?.images?.length > 0) {
            for (const image of content.images) {
                oldContent?.images.push(image);
            }
        }
        if (content?.pdfs?.length > 0) {
            for (const pdf of content.pdfs) {
                oldContent?.pdfs.push(pdf);
            }
        }
        return oldContent
    } catch (error) {
        throw new Error(error.message);
    }
}

