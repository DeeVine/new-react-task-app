import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinyMce extends React.Component {
  handleEditorChange = (e) => {
    const text = e.target.getContent()
    const taskName = this.props.taskInfo.taskName
    this.props.handleUpdateTextEditor(taskName, text)
  }

  render() {
    return (
      <Editor
        value={this.props.textEditorPrimaryContent}
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}
