export interface IUploadFiles {
  files: File[]
}

export interface IUploadFilesResponse {
  uuid: string
}

export interface IGetUploadedFiles {
  uuid: string
}

export interface IFileInfo {
  uuid: string
  urlToDownload: string
  name: string
  dateAdded: Date
}

export interface IGetUploadedFilesResponse {
  files: {
    [k: string]: IFileInfo
  }
}
