export const htmlToTextWordwrap = (html: string) => {
    const { htmlToText } = require('html-to-text')
    // const html = '<h1>Hello World</h1>';
    const text = htmlToText(html, {
        wordwrap: 130
    });
    // console.log(text); // Hello World
    return text;
};
