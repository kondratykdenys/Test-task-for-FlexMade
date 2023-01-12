import {
  IGetUploadedFiles,
  IGetUploadedFilesResponse,
  IUploadFiles,
  IUploadFilesResponse,
} from './types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import uuid from '../../utils/generateUuid'

const uploadFileApi = createApi({
  reducerPath: 'uploadFileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUploadedFiles: builder.query<IGetUploadedFilesResponse, IGetUploadedFiles>({
      query: ({ uuid }) => ({
        // url: `posts/${uuid}`,
        url: `posts`,
      }),
      transformResponse: () => ({
        files: Array.from({ length: Math.random() * 100 }).reduce((acc) => {
          const fileUuid = uuid()
          return {
            ...(acc as IGetUploadedFilesResponse['files']),
            [fileUuid]: {
              uuid: fileUuid,
              urlToDownload:
                'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png',
              name: fileUuid,
              type: 'text',
              dateAdded: new Date().getTime(),
            },
          }
        }, {}) as IGetUploadedFilesResponse['files'],
      }),
    }),
    uploadFile: builder.mutation<IUploadFilesResponse, IUploadFiles>({
      query: ({ files }) => ({
        url: 'posts',
        method: 'POST',
        data: files,
      }),
      transformResponse: () => ({
        uuid: uuid(),
      }),
    }),
  }),
})

export const { useUploadFileMutation, useGetUploadedFilesQuery } = uploadFileApi

export default uploadFileApi
