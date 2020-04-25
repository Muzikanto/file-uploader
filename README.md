## File-Uploader

[![npm version](https://badge.fury.io/js/%40muzikanto%2Ffile-uploader.svg)](https://badge.fury.io/js/%40muzikanto%2Ffile-uploader)
[![downloads](https://img.shields.io/npm/dm/@muzikanto/file-uploader.svg)](https://www.npmjs.com/package/@muzikanto/file-uploader)
[![dependencies Status](https://david-dm.org/muzikanto/file-uploader/status.svg)](https://david-dm.org/muzikanto/file-uploader)
[![size](https://img.shields.io/bundlephobia/minzip/@muzikanto/file-uploader)](https://bundlephobia.com/result?p=@muzikanto/file-uploader)

<!-- TOC -->

-  [Introduction](#introduction)
-  [Installation](#installation)
-  [Example](#example)
-  [License](#license)

<!-- /TOC -->

## Introduction

Peer dependencies: `react`, `react-dom`, `@types/react`
 
## Installation

```sh
npm i @muzikanto/file-uploader
# or
yarn add @muzikanto/file-uploader
```

## Example

[Example in storybook](https://muzikanto.github.io/file-uploader)

```typescript jsx
function Component() {
    return (
        <FileUploader
            // files={lFiles}
            // onChange={list => setFiles(list)}
            onChange={console.log}
            multiple
            accept={['image/jpeg', 'image/png']}
            maxSize={1024 * 100}
            onErrors={console.log}
            validate={el => el.name.indexOf('.pdf') != -1 ? 'custom error not pdf' : undefined}
        >
            {
                ({onClick, files, change, dragged, onDragEnter, onDragLeave, onDragOver, onDrop}) => {
                    return (
                        <>
                            <div
                                style={dragged ? { border: 'dashed 1px black'} : undefined}
                                onClick={onClick}
                                onDragEnter={onDragEnter}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                Drag & Drop your files or Browse
                            </div>
                            {
                                files.map(({file, error, success}, i) => {
                                    return (
                                        <>
                                          <span
                                               key={'file-' + i}
                                               style={{backgroundColor: success ? 'green' : 'red'}}
                                           >
                                            {file.name} ({file.size})
                                          </span>  
                                          {
                                              error &&
                                              <span>{error}</span>
                                          }
                                        </>
                                    );
                                })
                            }
                        </>
                    )
                }
            }
        </FileUploader>
    );
}
```

## License

[MIT](LICENSE)
