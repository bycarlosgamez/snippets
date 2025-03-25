import Link from 'next/link';
import { db } from '../db/index';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
        className='flex justify-between items-center p-2 border rounded'
      >
        <h2>{snippet.title}</h2>
        <p>View</p>
      </Link>
    );
  });

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <h1 className='text-xl font-bold'>Snippets</h1>
        <Link
          href='/snippets/new'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Add snippet
        </Link>
      </div>
      <div className='flex flex-col gap-2'>{renderedSnippets}</div>
    </div>
  );
}
