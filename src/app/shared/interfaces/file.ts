import { ImageFileType } from 'src/app/shared/enums/image-file-type';

export interface File {
    lastModified: number;
    name: string;
    size: number;
    type: ImageFileType;
    webkitRelativePath: string;
}
