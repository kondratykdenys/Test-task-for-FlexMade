import React from 'react'
import { Container } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useGetUploadedFilesQuery } from '../../services/uploadFile'
import UploadedFilesList from '../../components/UploadedFiles'

const UploadedFiles = () => {
  const params = useParams<{ uuid: string }>()

  const { data, isLoading } = useGetUploadedFilesQuery({ uuid: params.uuid as string })

  return (
    <Container>
      <Link to="/">Go home page</Link>
      <UploadedFilesList files={data?.files} loading={isLoading} />
    </Container>
  )
}

export default UploadedFiles
