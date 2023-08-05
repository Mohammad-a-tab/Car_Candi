import { diskStorage } from 'multer';
import { extname } from 'path';

const allowedImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];
const allowedVideoTypes = ["video/mp4", "video/mpg", "video/mov", "video/avi", "video/mkv"];
export const multerConfig = {
  dest: './uploads', // Destination folder for uploaded files
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/jpg',
      'video/mp4',
      'video/mpg',
      'video/mov',
      'video/avi',
      'video/mkv',
      'application/pdf',
    ];
        
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
  storage: diskStorage({
    destination: (req, file, callback) => {
      if (allowedImageTypes.includes(file.mimetype)) {
        callback(null, './public/uploads/images');
      }
      if (allowedVideoTypes.includes(file.mimetype)) {
        callback(null, './public/uploads/videos');
      }
      if (file.mimetype === "application/pdf") {  
        callback(null, './public/uploads/pdfs');
      }
    },
    filename: (req, file, callback) => {
      // Generate a unique filename for each file
      const uniqueSuffix = `${new Date().getTime()}`;
      const extension = extname(file.originalname);
      const baseName = file.originalname.replace(' ', '-');
      const filename = `${baseName}-${uniqueSuffix}${extension}`;
      callback(null, filename);
    },
  }),
};
