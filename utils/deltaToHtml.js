const QuillDeltaToHtmlConverter =
  require("quill-delta-to-html").QuillDeltaToHtmlConverter;

module.exports = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta.ops);
  const html = converter.convert();
  return html;
};
