const linkSchema = /\b(http|https):\/\/(www\.)?(.{1,}\.\w{1,})(.{1,}\/?)*/i;

const uncorrectDataText = 'Переданны некорректные данные';
const emailConflictText = 'Данный email уже был зарегистрирован';
const notFoundIdText = 'Пользователь по данному id не найден';
const uncorrectIdText = 'Переданн некорректный id';
const notFoundUserText = 'Запрашиваемый пользователь не найден';
const notFoundFilmText = 'Фильм с данным id не найден';
const deleteNotYourFilmText = 'Вы не можете удалить фильм который вы не сохраняли';
const fineDeleteFilmText = 'Фильм удален';

module.exports = {
  linkSchema,
  uncorrectDataText,
  emailConflictText,
  notFoundIdText,
  uncorrectIdText,
  notFoundUserText,
  notFoundFilmText,
  deleteNotYourFilmText,
  fineDeleteFilmText,
};
