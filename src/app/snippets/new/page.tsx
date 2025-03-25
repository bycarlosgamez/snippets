import { redirect } from 'next/navigation';
import { db } from '@/db';

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // Sever action
    'use server';

    // Check user inputs are valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // Create new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log(snippet);

    // Redirect to homepage
    redirect('/');
  }

  return (
    <>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl'>
          Add Snippet
        </h2>
        <p className='mt-2 text-lg/8 text-gray-600'>
          Save code snippets to reuse them later in other applications.
        </p>
      </div>
      <form
        action={createSnippet}
        method='POST'
        className='mx-auto mt-16 max-w-xl sm:mt-20'
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div className='sm:col-span-2'>
            <label
              htmlFor='title'
              className='block text-sm/6 font-semibold text-gray-900'
            >
              Title
            </label>
            <div className='mt-2.5'>
              <input
                id='title'
                name='title'
                type='text'
                autoComplete='organization'
                className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
              />
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='code'
              className='block text-sm/6 font-semibold text-gray-900'
            >
              Code
            </label>
            <div className='mt-2.5'>
              <textarea
                id='code'
                name='code'
                rows={4}
                className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
