import { Content } from "src/ikco/interface/content.interface";
import * as path from 'path';
import * as fs from 'fs';

const allowedImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];
const allowedVideoTypes = ["video/mp4", "video/mpg", "video/mov", "video/avi", "video/mkv"];

export function editPaths(files: any) {
    const images = [];
    const videos = [];
    const pdfs = [];

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

export function updateContentFunction(oldContent: Content, newContent: Content) {
    if (newContent?.title) {
        oldContent.title = newContent.title;
    }
    if (newContent?.description) {
        oldContent.description = newContent.description;
    }
    oldContent.videos.push(...(newContent.videos || []));
    oldContent.images.push(...(newContent.images || []));
    oldContent.pdfs.push(...(newContent.pdfs || []));

    return oldContent;
}

export function deleteFilePublic(files: any) {
    const { images, videos, pdfs } = editPaths(files);
    if(images?.length > 0) {
       for (const image of images) {
        const pathFile = path.join(__dirname, "..", "..", image)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
       }
    }
    if(videos?.length > 0) {
       for (const video of videos) {
        const pathFile = path.join(__dirname, "..", "..", video)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
       }
    }
    if(pdfs?.length > 0) {
       for (const pdf of pdfs) {
        const pathFile = path.join(__dirname, "..", "..", pdf)
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
       }
    }
    if(images || videos || pdfs == null || undefined || "" || [""]){
        return "Not found"
    }
}
