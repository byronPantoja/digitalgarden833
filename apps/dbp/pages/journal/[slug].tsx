import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@digitalgarden833/markdown';
import { MDXRemote } from 'next-mdx-remote';
import SectionContainer from '../../components/SectionContainer';
import { Youtube } from '@digitalgarden833/shared/mdx-elements';
export interface JournalProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube,
};

const POSTS_PATH = join(process.cwd(), '_journal833');

export function Journal({ frontMatter, html }) {
  return (
    <SectionContainer>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <h1>{frontMatter.title}</h1>
                    <div>by {frontMatter.author.name}</div>
                  </dd>
                </div>
              </dl>
            </div>
          </header>
        </div>
      </article>
      <div
        className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
            <MDXRemote {...html} components={mdxElements} />
          </div>
        </div>
      </div>
      <button>
        <Link href="/about">Back</Link>
      </button>
    </SectionContainer>
  );
}

export const getStaticProps: GetStaticProps<JournalProps> = async ({
  params,
}: {
  params: JournalProps;
}) => {
  const journalMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  const renderHTML = await renderMarkdown(journalMarkdownContent.content);

  return {
    props: {
      frontMatter: journalMarkdownContent.frontMatter,
      html: renderHTML,
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
