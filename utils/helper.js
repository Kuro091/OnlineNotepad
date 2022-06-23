
import { parse } from 'node-html-parser';


export function strip(html) {
    const root = parse(html);
    return root.textContent
}