import { diskStorage } from 'multer';

export const multerConfigForImages = {
    dest: '../../public/uploads/images',
    storage: diskStorage({
        destination: '../../public/uploads/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const originalNameWithoutSpaces = file.originalname.replace(/\s/g, '');
          const filename = `${uniqueSuffix}-${originalNameWithoutSpaces}`;
          callback(null, filename);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 15, // File size limit (15MB)
        files: 10, // Maximum number of files allowed
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'));
        }
    },
};
export const multerConfigForVideos = {
    dest: '../../public/uploads/videos',
    storage: diskStorage({
        destination: '../../public/uploads/videos',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const originalNameWithoutSpaces = file.originalname.replace(/\s/g, '');
          const filename = `${uniqueSuffix}-${originalNameWithoutSpaces}`;
          callback(null, filename);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 580, // File size limit (580MB)
        files: 10, // Maximum number of files allowed
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(mp4|mov|mkv|mpg)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'));
        }
    },
};
export const multerConfigForPDFs = {
    dest: '../../public/uploads/PDFs',
    storage: diskStorage({
        destination: '../../public/uploads/PDFs',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const originalNameWithoutSpaces = file.originalname.replace(/\s/g, '');
          const filename = `${uniqueSuffix}-${originalNameWithoutSpaces}`;
          callback(null, filename);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 50, // File size limit (50MB)
        files: 5, // Maximum number of files allowed
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(pdf)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'));
        }
    },
};
