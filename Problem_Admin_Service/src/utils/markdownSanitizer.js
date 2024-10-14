const marked = require('marked');
const sanatizeHtml = require('sanitize-html');
const TurndownService = require('turndown');

function sanitizeMarkDown(markdownContent) {
    
    // 1. Convert markdown to html
    const convertedHtml = marked.parse(markdownContent);

    // 2. Sanatize html
    const sanatizedHtml = sanatizeHtml(convertedHtml, {
        allowedTags: sanatizeHtml.defaults.allowedTags,
    })

    const turndownService = new TurndownService();
    const sanitizedMarkDown = turndownService.turndown(sanatizedHtml);

    return sanitizedMarkDown;
}

module.exports= sanitizeMarkDown;