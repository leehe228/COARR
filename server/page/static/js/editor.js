const editor = document.getElementById('editor1');
const img_btn = document.getElementById('tool-img-btn');
const img_selector = document.getElementById('img-selector');
const style_btn = document.getElementById('tool-style-btn');
const align_btn = document.getElementById('tool-align-btn');

const btn_bold = document.getElementById('btn-bold');
const btn_italic = document.getElementById('btn-italic');
const btn_underline = document.getElementById('btn-underline');
const btn_strike = document.getElementById('btn-strike');
const btn_orderedlist = document.getElementById('btn-ordered-list');
const btn_unorderedlist = document.getElementById('btn-unordered-list');

btn_bold.addEventListener('click', function () {
    setStyle('bold');
});

btn_italic.addEventListener('click', function () {
    setStyle('italic');
});

btn_underline.addEventListener('click', function () {
    setStyle('underline');
});

btn_strike.addEventListener('click', function () {
    setStyle('strikeThrough')
});

btn_orderedlist.addEventListener('click', function () {
    setStyle('insertOrderedList');
});

btn_unorderedlist.addEventListener('click', function () {
    setStyle('insertUnorderedList');
});

function setStyle(style) {
    document.execCommand(style);
    focus_editor();
}

function focus_editor() {
    editor.focus({preventScroll: true});
}

img_btn.addEventListener('click', function () {
    img_selector.click();
});

img_selector.addEventListener('change', function (e) {
    const files = e.target.files;
    if (!!files) {
        insert_image_data(files[0]);
    }
});

function insert_image_data(file) {
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
        focus_editor();
        document.execCommand('insertImage', false, `${reader.result}`);
    });
    reader.readAsDataURL(file);
}