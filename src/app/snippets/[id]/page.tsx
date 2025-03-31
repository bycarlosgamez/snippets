import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import * as actions from '@/actions';

type SnippetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetPage(props: SnippetPageProps) {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className='lg:max-w-lg'>
        <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
          {snippet.title}
        </h1>
        <div className='flex gap-2 justify-between items-center my-4'>
          <span className='text-gray-500'>Snippet actions</span>
          <div className='flex gap-2'>
            <Link
              href={`/snippets/${id}/edit`}
              className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Edit
            </Link>

            <form action={deleteSnippetAction}>
              <button className='rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'>
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
      <pre className='p-3 border rounded bg-gray-200 border-gray-400'>
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
