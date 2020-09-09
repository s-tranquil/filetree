import { IFolder } from "./IFolder";

export interface ITreeState {
    root: IFolder[];
    currentNumber: number
}