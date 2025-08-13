import React from 'react';
import EditSnippetForm from '@/components/EditSnippetForm';
import { prisma } from '@/lib/prisma';

type SnippetDetailProps = {
  params:Promise<{ id: string }>
}

const EditPageSnippet = async ({params,}:SnippetDetailProps) => {

const id = parseInt((await params).id);


const snippet = await prisma.snippet.findUnique({
    where:{
        id,
    }
});

if(!snippet) return <h1>snippet not found</h1>

return (
    <div>
       <EditSnippetForm snippet={snippet} />
    </div>
  );
}

export default EditPageSnippet;
