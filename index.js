"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const parse_file_list_1 = __importDefault(require("./helpers/parse-file-list"));
const validate_1 = __importDefault(require("./helpers/validate"));
function FileUploader(props) {
    const fileInputRef = react_1.default.createRef();
    const [files, setFiles] = react_1.default.useState([]);
    const [dragged, setDragged] = react_1.default.useState(false);
    const validate = react_1.default.useCallback((el) => {
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
        return validate_1.default(el, props);
    }, [props.accept, props.accept]);
    const onClick = react_1.default.useCallback((e) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef]);
    const onChange = react_1.default.useCallback((list) => {
        const newState = list.map(validate);
        const nextState = [...files, ...newState];
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
    const onDragEnter = react_1.default.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragged(true);
        }
    }, []);
    const onDragLeave = react_1.default.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragged(false);
    }, []);
    const onDragOver = react_1.default.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const onDrop = react_1.default.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragged(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onChange(parse_file_list_1.default(e.dataTransfer.files));
            e.dataTransfer.clearData();
        }
    }, []);
    react_1.default.useEffect(() => {
        if (props.files) {
            setFiles(props.files);
        }
    }, [props.files]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.children({
            onClick,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            files,
            dragged,
        }),
        react_1.default.createElement("input", { value: '', ref: fileInputRef, accept: props.accept ? props.accept.join(',') : undefined, style: { display: 'none' }, type: 'file', multiple: props.multiple, onChange: e => {
                const targetFiles = e.target.files;
                if (targetFiles) {
                    onChange(parse_file_list_1.default(targetFiles));
                }
                e.target.value = '';
            }, "max-size": props.maxSize })));
}
exports.default = FileUploader;
