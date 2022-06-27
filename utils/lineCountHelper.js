const removeStyleProp = (elm, props) =>
    elm.style.cssText = elm.style.cssText.split('; ')
        .filter(sp => props.every(p => !sp.startsWith(p)))
        .join(';');

// deals with editable content, where user can hit "ENTER" or "SHIFT+ENTER" 
// or complex content with nested block-level elements and <br>s
const addMeasureStyles = () => {
    document.head.insertAdjacentHTML("beforeend", `<style id="measureSingleLineHeight">
    .measureSingleLineHeight{ position: absolute !important; }
      .measureSingleLineHeight br{ display: none !important; }
      .measureSingleLineHeight *{ display: inline !important; }
  </style>`)
}

export function lineCount(elm) {
    const originalStyle = elm.style.cssText
    const computedStyles = getComputedStyle(elm)
    const isBorderBox = computedStyles['box-sizing'] == 'border-box'
    const boxVerticalPadding = ['padding-top', 'padding-bottom'].reduce((acc, p) => acc + parseInt(computedStyles[p]), 0)
    let initialScrollHeight  // with original line-height & height
    let scrollHeight // with full normalization - "line-height:0 & "height:auto"

    // normalize (should probably be done to all children also via treeWalker)
    // if "box-sizing: border-box;" skip next steps (but do them later for measuring single-line height)
    if (!isBorderBox) {
        elm.style.padding = 0 // clear restrains that might harm measuring
        elm.style.border = 0 // clear restrains that might harm measuring
    }

    initialScrollHeight = elm.clientHeight - (isBorderBox ? boxVerticalPadding : 0)

    addMeasureStyles()
    elm.classList.add('measureSingleLineHeight')
    elm.style.whiteSpace = 'nowrap' // make the whole text a single line, to measure line-height
    elm.style.height = 'auto' // make the height fit exactly to the single-line
    elm.style.padding = 0 // clear restrains that might harm measuring
    elm.style.border = 0 // clear restrains that might harm measuring

    const initialLineHeight = elm.scrollHeight - 1; // fix inaccurate height

    elm.style.minHeight = 0 // clear restrains that might harm measuring
    elm.style.lineHeight = 1  // normalize line-height to fit the font perfectly

    // measure
    const singleLineHeight = elm.scrollHeight  // easy with "white-space:nowrap"

    // cleanup
    measureSingleLineHeight.remove()
    elm.classList.remove('measureSingleLineHeight')
    removeStyleProp(elm, ['white-space', 'border', 'padding']); // bring back original border & padding because they affect the number of rendered lines (border-box)

    scrollHeight = elm.scrollHeight - (isBorderBox ? boxVerticalPadding : 0)

    const lineCount = Math.round(scrollHeight / singleLineHeight)
    const linesFit = Math.floor(initialScrollHeight / initialLineHeight)

    // undo above style changes
    elm.style.cssText = originalStyle

    return {
        lineCount: (isNaN(lineCount) || singleLineHeight == 0) ? 0 : lineCount,
        linesFit
    }
}