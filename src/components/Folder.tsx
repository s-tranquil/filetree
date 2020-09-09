import React, { FC } from "react";
import { IFolder } from "../contracts/IFolder";

interface IProps {
    onClick: (id: number) => void;
    folder: IFolder;
    level: number;
}

const Folder: FC<IProps> = ({
    onClick,
    folder,
    level
}) => {
    return (
        <li style={{ paddingLeft: `${8*level}px` }}>
            <button onClick={() => onClick(folder.id)}>{`Folder ${folder.id}`}</button>
            {folder.children?.map(child => (
                <Folder
                    key={child.id}
                    onClick={onClick}
                    folder={child}
                    level={level + 1}
                />
            ))}
        </li>
    );
};

export { Folder };