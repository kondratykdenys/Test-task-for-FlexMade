import React, { FC, useState } from 'react'
import { Box, CircularProgress, IconButton } from '@mui/material'
import { IFileInfo } from '../../services/uploadFile/types'
import DownloadIcon from '@mui/icons-material/Download'

type DownloadFileType = {
  fileInfo: IFileInfo
}

const DownloadFile: FC<DownloadFileType> = ({ fileInfo }) => {
  const [percentDownload, setPercentDownload] = useState<number>(0)
  const handleDownload = () => {
    const request = new XMLHttpRequest()

    request.responseType = 'blob'
    request.open('GET', fileInfo.urlToDownload, true)
    request.send()

    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const imageURL = window.URL.createObjectURL(this.response)

        const anchor = document.createElement('a')
        anchor.href = imageURL
        anchor.download = fileInfo.name
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
      }
    }

    //mock
    const timer = setInterval(() => {
      setPercentDownload((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10))
    }, 800)

    setTimeout(() => clearInterval(timer), 9000)

    // correct
    // request.onprogress = function (e) {
    //   const percentComplete = Math.floor((e.loaded / e.total) * 100)
    //
    //   setPercentDownload(percentComplete)
    // }
  }
  return (
    <Box>
      <IconButton onClick={handleDownload}>
        <DownloadIcon />
      </IconButton>
      <CircularProgress variant="determinate" value={percentDownload} />
    </Box>
  )
}

export default DownloadFile
