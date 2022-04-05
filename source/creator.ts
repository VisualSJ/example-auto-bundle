'use strict';

import { spawn } from 'child_process';

/**
 * 
 * @param creator 
 * @param path 
 */
export function build(creator: string, path: string) {
    return new Promise((resolve, reject) => {
        const child = spawn(creator, ['--project', path, '--build', 'platform=web-desktop;debug=true']);
        child.on('exit', (code) => {
            if (code === 36) {
                resolve(void 0);
            } else {
                reject();
            }
        });
    });
}
