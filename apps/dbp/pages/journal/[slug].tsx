import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

export interface JournalProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_journal833');

export function Journal({ frontMatter }) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>

      <button>
        <Link href="/about">Back</Link>
      </button>
    </div>
  );
}

export const getStaticProps: GetStaticProps<JournalProps> = async ({
  params,
}: {
  params: JournalProps;
}) => {
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  const renderHMTL = renderMarkdown();

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths<JournalProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Journal;
