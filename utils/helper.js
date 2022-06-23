
import { parse } from 'node-html-parser';


export function strip(html) {
    const root = parse(html);
    return root.textContent
}

export function isEmpty(value) {
    return (
        // null or undefined
        (value == null) ||

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}