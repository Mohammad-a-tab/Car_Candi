import { diskStorage } from 'multer';

export const multerConfigForImages = {
    dest: '../../public/uploads',
    storage: diskStorage({
        destination: './uploads',
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
    dest: '../../public/uploads',
    storage: diskStorage({
        destination: './uploads',
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
    dest: '../../public/uploads',
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const originalNameWithoutSpaces = file.originalname.replace(/\s/g, '');
          const filename = `${uniqueSuffix}-${originalNameWithoutSpaces}`;
          callback(null, filename);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5, // File size limit (5MB)
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
