import { Pipe, PipeTransform } from '@angular/core';

/**
 * Takes an integer representing a byte value and converts it
 * into B / KB / MB / GB or TB.
 *
 * @export
 * @class FileSizePipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {

    /**
     * Pipe implementation, inherited from PipeTransform
     *
     * @param {number} bytes
     * @param {number} precision
     * @returns {string}
     */
    transform(bytes: number, precision: number): string {
        const kb = 1024, mb = 1048576, gb = 1073741824, tb = 1099511627776;

        let value: number;
        let suffix: string;

        if (bytes < kb) { suffix = ' B'; value = bytes; } else
        if (bytes >= kb && bytes < mb) { suffix = ' KB'; value = bytes / kb; } else
        if (bytes >= mb && bytes < gb) { suffix = ' MB'; value = bytes / mb; } else
        if (bytes >= gb && bytes < tb) { suffix = ' GB'; value = bytes / gb; } else {
            suffix = ' TB'; value = bytes / tb;
        }

        let multiplier = Math.pow(10, precision || 0);
        let rounded = Math.round(value * multiplier) / multiplier;

        return rounded.toString() + suffix;
    }
}
