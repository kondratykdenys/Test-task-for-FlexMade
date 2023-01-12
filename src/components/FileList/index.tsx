import React, { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

type FileListType = {
  files: { [k: string]: File }
  removeFile: (uuid: string) => void
}
const FileList: FC<FileListType> = ({ files, removeFile }) => {
  const filesTransform = Object.entries(files)

  if (!filesTransform.length)
    return (
      <Box>
        <Typography>Non select files</Typography>
      </Box>
    )

  return (
    <Grid container flexDirection="column">
      {filesTransform.map(([uuid, file]) => (
        <Grid item container alignItems="center" key={uuid}>
          <Grid item>
            <IconButton onClick={() => removeFile(uuid)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>
              {file.name} - {file.type}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default FileList
