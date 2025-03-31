'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function error({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
