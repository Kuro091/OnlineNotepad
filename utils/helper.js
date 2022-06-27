
import { parse } from 'node-html-parser';

export function strip(html) {
    const root = parse(html);
    return root.textContent
}

export function getCaretCharOffset(element) {
    var caretOffset = 0;

    if (window.getSelection) {
        var range = window.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
    }

    else if (document.selection && document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        var preCaretTextRange = document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }

    return caretOffset;
}

export const getSelectionCaretAndLine = (editable) => {
    // collapse selection to end
    window.getSelection().collapseToEnd();

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);


    // get anchor node if startContainer parent is editable
    let selectedNode = editable === range.startContainer.parentNode
        ? sel.anchorNode
        : range.startContainer.parentNode;

    if (!selectedNode) {
        return {
            caret: -1,
            line: -1,
        };
    };

    // select to top of editable
    if (typeof editable.firstChild == typeof {}) {
        range.setStart(editable.firstChild, 0);

        // do not use 'this' sel anymore since the selection has changed
        const content = window.getSelection().toString();

        const text = JSON.stringify(content);
        const lines = (text.match(/\\n/g) || []).length + 1;

        // clear selection
        window.getSelection().collapseToEnd();

        //extract content, should look like: \n [content]
        //caret = end of content
        const extractedContent = content.substr(content.lastIndexOf('\n') + 1, content.length);

        return {
            caret: text.length - 2,
            text: extractedContent,
            rawText: text,
            line: lines,
            html: selectedNode.outerHTML
        }
    }

    return {
        caret: 0,
        line: 0,
        html: ''
    }

}

export function indexOfGroup(match, n) {
    var ix = match.index;
    for (var i = 1; i < n; i++)
        if (match[i])
            ix += match[i].length;
    return ix;
}
