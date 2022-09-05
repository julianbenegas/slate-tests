import { Meta } from '~/components/common/meta'
import { PageLayout } from '~/components/layout/page'
import { Editor } from '~/components/slate/editor'

const HomePage = () => {
  return (
    <PageLayout>
      <Meta />

      <Editor />
    </PageLayout>
  )
}

export default HomePage
