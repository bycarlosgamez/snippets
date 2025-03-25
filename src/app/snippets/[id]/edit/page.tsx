import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippet-edit-form';

type SnippetEditProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetEditPage(props: SnippetEditProps) {
  const { id } = await props.params;

  const snippetId = parseInt(id);
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) return notFound();

  return <SnippetEditForm snippet={snippet} />;
}
