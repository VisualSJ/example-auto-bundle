'use strict';

const { join, isAbsolute } = require('path');

const creator = require('./dist/creator');
const fake = require('./dist/fake');

const args = {
    creator: '/Applications/CocosCreator/Creator/3.4.2/CocosCreator.app/Contents/MacOS/CocosCreator',
    project: join(__dirname, './test/project'),
    file: '',
};
process.argv.forEach((arg) => {
    if (arg.startsWith('--file=')) {
        const file = arg.slice(7);
        if (isAbsolute(file)) {
            args.file = file;
        } else {
            args.file = join(process.cwd(), file);
        }
    }
});

(async () => {
    console.time('build');
    const uuid = await fake.generateBundleFromDirectory(
        args.project,
        args.file,
    );
    await creator.build(
        args.creator,
        args.project,
    );
    console.timeEnd('build');

    const bundleDir = join(args.project, `build/web-desktop/assets/${uuid}`);

    // TODO
    // 这是个正常的 bundle 文件夹，可以拷贝出去，然后当成远程的 bundle，使用引擎的接口动态加载
    console.log(bundleDir);
})();
