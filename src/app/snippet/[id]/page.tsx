import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import React from 'react';
import Link from "next/link";
import { redirect } from 'next/navigation'
import { deleteSnippet} from '@/actions';
import { notFound } from 'next/navigation';


type SnippetDetailProps = {
  params:Promise<{ id: string }>
}

const SnippetDetailPage = async({params,}:SnippetDetailProps) => {
  const { id } = await params;

  await new Promise((r)=>setTimeout(r,2000));

  const snippet = await prisma.snippet.findUnique({
    where:{
      id:parseInt(id),
    },
  });

  if(!snippet) notFound();

  // Method1 

  // const deleteSnippet = async () =>{
  //  "use server"
  //   await prisma.snippet.delete({
  //     where :{id:parseInt(id)},
  //   });
  //   redirect("/");
  // }

  //Method2

  const deleteSnippetAction = deleteSnippet.bind(null,parseInt(id));



  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-xl'> {snippet.title}</h1>
        <div className='flex items-center gap-2'>
        <Link href={`/snippet/${snippet.id}/edit`} ><Button>Edit</Button></Link>
        
        <form action={deleteSnippetAction}>
          <Button variant={'destructive'} type='submit' >Delete</Button>
        </form>
        </div>
      </div>

      <pre className='p-3 bg-gray-200 border-gray-200 rounded' >
        <code>
          {snippet.code}
        </code>
      </pre>


    </div>
  );
}

export default SnippetDetailPage;
