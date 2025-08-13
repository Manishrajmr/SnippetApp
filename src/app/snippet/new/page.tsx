import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';


const createSnippetPage = (formData:FormData) => {

    async function createSnippet(formData:FormData){
        "use server" //use server directives

        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        const snippet = await prisma.snippet.create({
            data:{
                title,
                code
            }
        });

        console.log("snippet created",snippet);

        redirect("/");
    }


  return (
    <div>
      <form action={createSnippet}>
        <div>
        <Label>Title</Label>
        <Input type='text' name='title' id='title'  />
      </div> 

       <div  >
        <Label>Code</Label>
        <Textarea name='code' id='code' placeholder="Type your message here." />
      </div> 

      <Button type='submit' className='mt-4' >Submit</Button>
      </form>
    </div>
  );
} 

export default createSnippetPage;
