/* eslint-disable object-shorthand */
import path from 'path';
import multer from 'multer';

// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Генерация уникального имени файла
  },
});

// Фильтр для проверки типа файла
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Разрешить загрузку
  } else {
    cb(new Error('Неверный формат файла, можно загрузить только jpeg, png, gif, mp4.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024, // Ограничение размера файла (1 МБ)
  },
});

export default upload;
