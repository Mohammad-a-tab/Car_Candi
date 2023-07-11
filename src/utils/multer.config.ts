import { diskStorage } from 'multer';

export const multerConfig = {
    dest: './uploads',
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
