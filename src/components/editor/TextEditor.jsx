import { MDXEditor } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

function TextEditor() {
  return <MDXEditor markdown="# Hello world" plugins={[headingsPlugin()]}  />
}

export default TextEditor;