"use client"
import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import { Button } from './ui/button';
// import * as actions from '@/actions'
import type {Snippet} from "@prisma/client";
import { saveSnippet } from '@/actions';


// type Snippet = {
//     id:number,
//     title:string,
//     code:string
// }

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {

    const [code,setCode] = useState(snippet.code);
     
    // you can not use a server action as a inline client Component
    // async function saveSnippet(){
    //     "use server"
    // }

    const changeEventHandler = (value:string = "") =>{

        setCode(value);
    }

    const saveSnippetAction = saveSnippet.bind(null,snippet.id,code);




  return (
    <div className='flex flex-col gap-4'>
    <form action={saveSnippetAction} className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'>Your Code Editor:</h1>
        <Button type="submit">Save</Button>
    </form>

    <Editor 
      height="70vh"
      theme='vs-dark'
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={changeEventHandler}
    />
    </div>
  );
}

export default EditSnippetForm;
