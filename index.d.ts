import React from 'react';
export interface FileUploaderRenderProps {
    files: FileItem[];
    onClick: (e: React.MouseEvent) => void;
    onDragEnter: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    dragged: boolean;
}
export interface FileItem {
    file: File;
    error?: 'max-size' | 'not-accept';
    success: boolean;
}
export interface Index<F extends FileItem = FileItem> {
    multiple?: boolean;
    accept?: string[];
    maxSize?: number;
    files?: F[];
    onChange?: (files: F[]) => void;
    onErrors?: (errors: F[]) => void;
    validate?: (file: File) => string | undefined;
    children: (props: FileUploaderRenderProps) => JSX.Element;
}
declare function FileUploader<F extends FileItem = FileItem>(props: Index<F>): JSX.Element;
export default FileUploader;
