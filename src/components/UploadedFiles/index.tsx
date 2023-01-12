import React, { FC } from 'react'
import { Grid, Typography, CircularProgress } from '@mui/material'
import { IGetUploadedFilesResponse } from '../../services/uploadFile/types'
import DownloadFile from '../DownloadFile'

type UploadedFilesListType = {
  files: IGetUploadedFilesResponse['files'] | undefined
  loading: boolean
}
const UploadedFilesList: FC<UploadedFilesListType> = ({ files, loading }) => {
  if (loading) {
    return (
      <Grid container justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  if (!files || !Object.keys(files).length) {
    return (
      <Grid container justifyContent="center">
        <Grid item>
          <Typography>Files not found</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container mt={2} flexDirection="column">
      {Object.entries(files).map(([uuid, file]) => (
        <Grid item container alignItems="center" key={uuid}>
          <Grid item>
            <Typography>{file.name}</Typography>
          </Grid>
          <Grid item>
            <DownloadFile fileInfo={file} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default UploadedFilesList
