import React, { ChangeEvent, FC } from 'react'
import { Button } from '@mui/material'

type UploadFileType = {
  uploadFile: (files: File | null) => void
}

const UploadFile: FC<UploadFileType> = ({ uploadFile }) => {
  const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) =>
    uploadFile(e.target.files ? e.target.files[0] : null)

  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden onChange={handleUploadFiles} />
    </Button>
  )
}

export default UploadFile
