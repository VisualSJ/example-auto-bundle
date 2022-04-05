'use strict';

import { basename, extname, join } from 'path';
import { copy, outputJSON, emptyDir, ensureDir } from 'fs-extra';
import { v4 } from 'uuid';

/**
 * 传入一个 fbx 文件地址，在项目内创建一个 bundle 文件夹
 * 
 * @param project 
 * @param fbxPath 
 */
export async function generateBundleFromDirectory(project: string, fbxPath: string) {
    const uuid = v4();

    const eName = extname(fbxPath);
    const bName = basename(fbxPath, eName);

    const bundleDir = join(project, 'assets/bundle');
    await ensureDir(bundleDir);
    await emptyDir(bundleDir);

    // bundle 文件夹，用 uuid 为名字，避免冲突
    const assetsDir = join(bundleDir, uuid);

    const meta = {
        ver: '1.1.0',
        importer: 'directory',
        imported: true,
        uuid,
        files: [],
        subMetas: {},
        userData: {
            compressionType: {},
            isRemoteBundle: {},
            isBundle: true,
            bundleName: uuid,
        },
    };

    // 复制 fbx 文件
    await copy(fbxPath, join(assetsDir, bName + eName));
    // 生成 bundle 文件夹的 meta
    await outputJSON(assetsDir + '.meta', meta);

    return uuid;
}