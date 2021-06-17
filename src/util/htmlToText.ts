import { htmlToText } from "html-to-text";

export const htmlToTextWordwrap = (html: string):string => {
    // const html = '<h1>Hello World</h1>';
    const text = htmlToText(html, {
        wordwrap: 130
    });
    // console.log(text); // Hello World
    return text;
};
