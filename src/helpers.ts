function parseFileList(fileList: FileList): File[] {
    const list: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);

        if (file) {
            list.push(file);
        }
    }

    return list;
}

const makeValidator = (options: { accept?: string[], maxSize?: number; }, labels: { notAccept?: string, maxSize?: string }) => (file: File) => {
    if (options.accept && options.accept.indexOf(file.type) === -1) {
        return {
            file,
            success: false,
            error: labels.notAccept || 'not-accept',
        };
    }

    if (options.maxSize && file.size > options.maxSize) {
        return {
            file,
            success: false,
            error: labels.maxSize || 'max-size',
        };
    }

    return {
        file,
        success: true,
    };
};

export {
    parseFileList,
    makeValidator,
};
