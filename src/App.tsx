import React, { useReducer, useCallback } from 'react';
import './App.css';
import { ITreeState } from './contracts/ITreeState';
import { IFolder } from './contracts/IFolder';
import { Folder } from './components/Folder';

const initialState: ITreeState | never = {
  currentNumber: 4,
  root: [
    {
      id: 1,
      children: [
        {id: 2},
        {id: 3}
      ]
    },
    { id: 4 }
  ]
};

type TreeActionType = "add";

interface ITreeActionPayload {
  parentId: number
};

interface ITreeAction {
  type: TreeActionType;
  payload: ITreeActionPayload;
}

function findFolder (tree: IFolder[], id: number): IFolder | undefined {
  for (let i = 0; i < tree?.length; i++) {
    if (tree[i].id === id) {
      return tree[i];
    }
    if (tree[i].children?.length) {
      const folder = findFolder(tree[i].children as IFolder[], id);
      if (folder) {
        return folder;
      }
    }
  }
}

function folderReducer(state: ITreeState, action: ITreeAction): ITreeState {
  switch (action.type) {
    case "add": {
      const newNumber = state.currentNumber + 1;
      const newState = {
        ...state,
        currentNumber: newNumber,
        root: JSON.parse(JSON.stringify(state.root))
      } as ITreeState;

      const folder = findFolder(newState.root, action.payload.parentId) as IFolder;
      let children = folder.children || [];
      children = [
        ...children,
        {
          id: newNumber
        }
      ];
      folder.children = children;

      return newState;
    }
    default:
      throw new Error();
  }
}


function App() {
  const [treeState, dispatch] = useReducer(folderReducer, initialState);
  const onClick = useCallback(
    (id: number) => dispatch({
      type: "add",
      payload: {
        parentId: id
      }
    }),
    []
  );

  return (
    <div className="App">
        <ul>
        {treeState.root.map(folder => (
            <Folder
                key={folder.id}
                folder={folder}
                level={1}
                onClick={onClick}
            />
        ))}
        </ul>
    </div>
  );
}

export default App;
