import React from "react";
import { Form, Input, Icon, Button, Alert } from "antd";
import TextArea from "antd/lib/input/TextArea";
import style from "@/utils/utils.less";
import { connect } from "dva";
import { createActions } from "@/utils/createActions";
import { PostsTypesCreate } from "@/utils/types";

@connect(({ posts, loading }) => ({
  posts,
  submitting: loading.effects[PostsTypesCreate]
}))
class CreatePosts extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        dispatch(createActions(PostsTypesCreate, values))
      }
    });
  }

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { getFieldDecorator } = this.props.form;
    const { posts, submitting } = this.props
    const { created, createdMsg } = posts

    return (
      <div className={style['form-box']}>
        <Form onSubmit={this.handleSubmit}>
          {
            !created && createdMsg && this.renderMessage(createdMsg)
          }
          <Form.Item label={(
            <span>
              <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)', marginRight: '6px' }} />
              标题
            </span>
          )}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
            })(
              <Input name='title' placeholder="title" />
            )}
          </Form.Item>
          <Form.Item label={(
            <span>
              <Icon type="tags" style={{ color: 'rgba(0,0,0,.25)', marginRight: '6px' }} />
              标签(用空格分割)
            </span>
          )}
          >
            {getFieldDecorator('tags', {
              rules: [{ required: true, message: '请输入标签' }],
            })(
              <Input name='tags' placeholder="请输入tags，用空格分割" />
            )}
          </Form.Item>
          <Form.Item label={(
            <span>
              <Icon type="form" style={{ color: 'rgba(0,0,0,.25)', marginRight: '6px' }} />
              内容(markdown)
            </span>
          )}
          >
            {getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入内容' }],
            })(
              <TextArea name='content' rows={15}>Remember me</TextArea>
            )}
          </Form.Item>
          <Form.Item>
            <Button loading={submitting} type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CreatePosts)
