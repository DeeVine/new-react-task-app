import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class TinyMce extends React.Component {
  handleEditorChange = (e) => {
    const text = e.target.getContent()
    const slicedValue = text.slice(3, text.length-4)
    // console.log('slicedvalue', slicedValue)
    const taskName = this.props.taskInfo.taskName
    this.props.handleUpdateTextEditor(taskName, slicedValue)
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
