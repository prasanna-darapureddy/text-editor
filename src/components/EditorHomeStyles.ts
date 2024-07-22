export const styles = {
    allListsBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        m: 4,
    },
    listBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        textAlign: 'center',
        p: 5,
    },
    itemText: {
        textTransform: 'capitalize',
        fontSize: '18px',
    },
    editorPageBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        m: 5
    },
    editorBox: {
        height: 500,
        width: '100%',
        border: "1px solid ",
        borderColor: '#f1f1f1',
        p: 2,
        m: 2,
        overflow: 'auto',
    },
    toolBarStyles: {
        scrollbarWidth: "none",
        mb: 1,
        "&::rdw-editor-toolbar": {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: '20px',
        },
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "&-ms-overflow-style:": {
            display: "none",
        },
    },
    totalEditorStyle: {
        width: 'inherit',
    },
    editorStyles: {
        height: 450,
        width: '100%',
        border: "1px solid ",
        borderColor: '#ccc',
        p: 2,
        mt: 2,
        overflow: 'auto',
    },
    saveBtn: {
        alignSelf: 'flex-end',
    }
}