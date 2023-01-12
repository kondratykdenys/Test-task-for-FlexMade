import React from 'react'
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import UploadFile from '../../components/UploadFile'
import FileList from '../../components/FileList'
import { useUploadFileMutation } from '../../services/uploadFile'
import { useMutationWithAbort } from '../../hooks/useMutationWithAbort'
import uuid from '../../utils/generateUuid'
import { useNavigate } from 'react-router-dom'

interface IForm {
  files: { [k: string]: File }
}
const HomePage = () => {
  const navigate = useNavigate()
  const [uploadFile, { isLoading }, abort] = useMutationWithAbort(useUploadFileMutation)

  const { handleSubmit, control, formState, setValue, setError, getValues } = useForm<IForm>({
    defaultValues: {
      files: {},
    },
  })

  const onSubmit = async ({ files }: IForm) => {
    if (!Object.keys(files).length) {
      return setError('files', { message: 'Need select file' })
    }

    try {
      const result = await uploadFile({ files }).unwrap()
      navigate(`/uploaded-files/${result.uuid}`)
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  const handleChangeFiles = (file: File | null) => {
    if (!file) {
      return setError('files', { message: 'Need select file' })
    }

    const files = getValues().files

    setValue(
      'files',
      { ...files, [uuid()]: file },
      {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: false,
      },
    )
  }

  const handleRemoveFile = (uuid: string) => {
    const files = getValues().files

    delete files[uuid]

    setValue('files', files, {
      shouldTouch: true,
      shouldValidate: true,
      shouldDirty: false,
    })
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid p={2} container justifyContent="center" alignItems="center">
          <Grid item>
            <UploadFile uploadFile={handleChangeFiles} />
          </Grid>
        </Grid>
        <Controller
          control={control}
          name="files"
          render={({ field }) => <FileList files={field.value} removeFile={handleRemoveFile} />}
        />
        {formState.errors?.files?.message && (
          <Typography color="error.main">{`${formState.errors?.files?.message}`}</Typography>
        )}
        <Box sx={{ mt: 2 }}>
          <Button sx={{ mr: 2 }} variant="contained" type="submit">
            Send file to API
          </Button>
          <Button disabled={!abort} variant="contained" onClick={abort}>
            Abort request
          </Button>
        </Box>
        {isLoading && (
          <Grid container justifyContent="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default HomePage
