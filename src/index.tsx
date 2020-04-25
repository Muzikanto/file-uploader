import React from 'react';
import {parseFileList, makeValidator} from "./helpers";

export interface FileUploaderRenderProps {
    files: FileItem[];
    onClick: (e: React.MouseEvent) => void;

    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    dragged: boolean;

    change: (files: FileItem[]) => void;
}

export interface FileItem {
    file: File;
    error?: string;
    success: boolean;
}

export interface FileUploaderProps {
    multiple?: boolean;
    reset?: boolean;
    accept?: string[];
    maxSize?: number;

    files?: FileItem[];
    onChange?: (files: FileItem[]) => void;
    onErrors?: (errors: FileItem[]) => void;

    validate?: (file: File) => string | undefined;
    validateErrors?: {
        notAccept?: string;
        maxSize?: string;
    }

    children: (props: FileUploaderRenderProps) => JSX.Element;
}

function FileUploader(props: FileUploaderProps) {
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [files, setFiles] = React.useState<FileItem[]>([]);
    const [dragged, setDragged] = React.useState(false);

    const validator = React.useCallback(makeValidator(
        {accept: props.accept, maxSize: props.maxSize},
        {...props.validateErrors},
    ), [props.validateErrors]);
    const validate = React.useCallback((el: File) => {
        if (props.validate) {
            const err = props.validate(el);

            if (err) {
                return {
                    file: el,
                    error: err,
                    success: false,
                };
            }
        }

        return validator(el);
    }, [validator]);

    const onClick = React.useCallback((e: React.MouseEvent) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef]);
    const onChange = React.useCallback((list: File[]) => {
        const newState = list.map(validate) as FileItem[];

        const nextState: FileItem[] = [];

        if (!props.reset) {
            newState.push.apply(nextState, files);
        }
        newState.push.apply(nextState, newState);

        if (!props.files) {
            setFiles(nextState);
        }

        if (props.onErrors) {
            props.onErrors(newState);
        }

        if (props.onChange) {
            props.onChange(nextState);
        }
    }, [files]);

    const onDragEnter = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragged(true);
        }
    }, []);
    const onDragLeave = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setDragged(false);
    }, []);
    const onDragOver = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const onDrop = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setDragged(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onChange(parseFileList(e.dataTransfer.files));
            e.dataTransfer.clearData();
        }
    }, []);

    React.useEffect(() => {
        if (props.files) {
            setFiles(props.files);
        }
    }, [props.files]);

    return (
        <>
            {
                props.children({
                    onClick,
                    onDragEnter,
                    onDragLeave,
                    onDragOver,
                    onDrop,
                    files,
                    dragged,
                    change: (arr) => setFiles(arr),
                })
            }
            <input
                value=''
                ref={fileInputRef}
                accept={props.accept ? props.accept.join(',') : undefined}
                style={{display: 'none'}}
                type='file'
                multiple={props.multiple}
                onChange={e => {
                    const targetFiles = e.target.files;

                    if (targetFiles) {
                        onChange(parseFileList(targetFiles));
                    }

                    e.target.value = '';
                }}
                max-size={props.maxSize}
            />
        </>
    );
}

export default FileUploader;
