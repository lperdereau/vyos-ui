import {string} from "postcss-selector-parser";

export type Layout = {
    host_name: string,
    version: {
        version: string
    }
}