import { Add, ArrowBack, Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";
import ReactHtmlParser from "react-html-parser";
import { useEffect, useState } from 'react'
import { styles } from './EditorHomeStyles'

const initialContentList = [
    {
        id: 1,
        text: 'First Text',
    },
    {
        id: 2,
        text: 'Second Text',
    },
    {
        id: 3,
        text: 'Third Text',
    },
]

function EditorHome() {
    const [editText, setEditText] = useState<string>("") //Text in editor    
    const [convertedContent, setConvertedContent] = useState<string>(""); //HTML elements from editor    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty()) //Initial editor state for the editor
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [id, setId] = useState<number>(0) //Which Object identification    
    const [contentList, setContentList] = useState(initialContentList)

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    const handleAddNew = () => {
        setIsEditable(true)
        setId(0)
        setEditorState(EditorState.createEmpty());
    }

    const handleEditBtn = (item: { id: number, text: string }) => {
        setIsEditable(true)
        setId(item.id)
        setEditorState(EditorState.createWithContent(convertFromHTML(item.text)))
    }

    const handleDelete = (item: { id: number, text: string }) => {
        const filteredList = contentList.filter(each => each.id !== item.id)
        setContentList(filteredList)
    }

    const handleChange = (data: string) => {
        setEditText(data)
    };

    const handleSaveHTML = () => {
        if (id) {
            const updatedList = contentList.map(each => {
                if (each.id === id) {
                    return { id, text: convertedContent }
                } else {
                    return each
                }
            })
            setContentList(updatedList)
            setIsEditable(false)
        } else {
            if (editText !== '') {
                setContentList([...contentList, { id: contentList.length + 1, text: convertedContent }])
                setIsEditable(false)
            }
        }
    };

    return (
        <>
            {isEditable ?
                <Box sx={styles.editorPageBox}>
                    <Stack alignSelf={'flex-end'}>
                        <IconButton onClick={() => setIsEditable(false)}><ArrowBack /></IconButton>
                    </Stack>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        //@ts-ignore
                        onChange={(data) => handleChange(data.blocks[0].text)}
                        wrapperStyle={styles.totalEditorStyle}
                        editorStyle={styles.editorStyles}
                        toolbarStyle={styles.toolBarStyles}
                    />
                    <Button variant='contained' onClick={handleSaveHTML} sx={styles.saveBtn}>Save</Button>
                </Box>
                :
                <Stack direction={'column'} p={10} gap={3}>
                    <Stack alignSelf={'flex-end'}>
                        <IconButton onClick={handleAddNew}><Add /></IconButton>
                    </Stack>
                    <Box sx={styles.allListsBox}>
                        {contentList.map((item) => (
                            <Box component={Paper} sx={styles.listBox} key={item.id}>
                                <Typography >{ReactHtmlParser(item.text)}</Typography>
                                <Box>
                                    <IconButton onClick={() => handleEditBtn(item)} >
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item)} >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Stack>
            }
        </>
    )
}

export default EditorHome
