import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Editor } from '~/components/slate/editor'

const HomePage = () => {
  return (
    <PageLayout>
      <Meta />

      <div className="max-w-3xl mx-auto px-16 py-16">
        <h1 className="mb-4 text-4xl font-bold">My Document</h1>
        <Editor />
      </div>
    </PageLayout>
  )
}

export default HomePage
