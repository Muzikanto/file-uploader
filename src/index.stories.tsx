import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import React from 'react';
import BaseFileUploader, {FileItem} from './index';
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from 'clsx';
import {Theme} from "@material-ui/core";
import {CheckCircleOutlineOutlined, ErrorOutlineOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    file: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    file_success: {
        backgroundColor: theme.palette.success.main,
    },
    file_error: {
        backgroundColor: theme.palette.error.main,
    },
    name: {
        color: 'white',
        fontSize: 15,
    },
    size: {
        marginLeft: 10,
        color: 'white',
        opacity: 0.6,
        fontSize: 14,
    },
    remove: {
        color: 'white',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
        },
    },
    icon: {
        color: 'white',
        marginRight: 10,
    },
}));

export default {
    title: 'Components',
    parameters: {
        component: BaseFileUploader,
    },
};

export function FileUploader() {
    // controlled or uncontrolled component
    // const [lFiles, setFiles] = React.useState<FileItem[]>([]);

    return (
        <BaseFileUploader
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
                        <Paper
                            onClick={onClick}
                            elevation={dragged ? 4 : 1}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: 15, cursor: 'pointer', width: 400
                            }}

                            onDragEnter={onDragEnter}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <Typography>Drag & Drop your files or Browse</Typography>
                            {
                                files.length > 0 &&
                                <Grid container spacing={2} style={{marginTop: 10}}>
                                    {
                                        files.map((el, i) => {
                                            return (
                                                <Grid item xs={12} key={'file-' + i}>
                                                    <RenderFile
                                                        data={el}
                                                        onRemove={() => {
                                                            const arr = [...files];

                                                            arr.splice(i, 1);

                                                            change(arr);
                                                        }}
                                                    />
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            }
                        </Paper>
                    );
                }
            }
        </BaseFileUploader>
    );
}

function parseFileSize(rawSize: number) {
    const size = +(rawSize / 1024).toFixed(0);

    if (size < 1024) {
        return size + ' kb';
    } else {
        return size + ' mb';
    }
}

function RenderFile(props: { data: FileItem; onRemove: () => void; }) {
    const classes = useStyles();

    const data = props.data;

    return (
        <>
            <Paper
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                elevation={4}
                className={clsx(classes.file, {
                    [classes.file_success]: data.success,
                    [classes.file_error]: !data.success,
                })}
            >
                <Box display='flex' alignItems='center'>
                    {
                        data.success ?
                            <CheckCircleOutlineOutlined className={classes.icon}/> :
                            <ErrorOutlineOutlined className={classes.icon}/>
                    }
                    <Typography
                        className={classes.name}
                    >
                        {data.file.name}
                    </Typography>
                    <Typography
                        className={classes.size}
                    >
                        ({parseFileSize(data.file.size)})
                    </Typography>
                </Box>
                <IconButton
                    className={classes.remove}
                    size='small'
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        props.onRemove();
                    }}
                >
                    <Close/>
                </IconButton>
            </Paper>
            {
                data.error &&
                <Typography color='error'>{data.error}</Typography>
            }
        </>
    )
}
