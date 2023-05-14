const linkSchema = /\b(http|https):\/\/(www\.)?(.{1,}\.\w{1,})(.{1,}\/?)*/i;
const ruSchema = /^[а-яё -]+$/i;
const enSchema = /^[a-z -]+$/i;

module.exports = {
  linkSchema,
  ruSchema,
  enSchema,
};
