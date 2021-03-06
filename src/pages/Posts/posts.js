import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag } from "antd";
import { createActions } from "@/utils/createActions";
import { PostsTypesGetPosts } from "@/utils/types";
import { routerRedux } from "dva/router";
import { fetchDeletePost } from "@/services/posts";
import AdminTable from "@/components/AdminTable";

@connect(({ posts, loading }) => ({
  list: posts.list,
  totalCount: posts.totalCount,
  loading: loading.effects[PostsTypesGetPosts]
}))
class PostsPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      visible: false,
      deleteId: null
    }
  }

  componentDidMount() {
    this.updatePosts()
  }

  updatePosts = () => {
    const { page } = this.state
    const { dispatch } = this.props
    dispatch(createActions(PostsTypesGetPosts, page))
  }

  handleChangePage = (current) => {
    this.setState({
      page: current
    }, () => {
      this.updatePosts()
    })
  }

  handleTo = (path) => {
    const { dispatch } = this.props
    dispatch(routerRedux.push(path))
  }

  showModal = (id) => {
    this.setState({
      visible: true,
      deleteId: id
    });
  }

  handleClickModel = async (flag) => {
    this.setState({
      visible: false,
    });
    if (flag) {
      const { deleteId } = this.state
      const body = await fetchDeletePost(deleteId)
      if (body.status === 200) {
        this.updatePosts()
      }
    }
  }

  render() {
    const { list, totalCount, loading } = this.props
    const { page, visible } = this.state
    const colums = [{
      title: '标题',
      key: 'title',
      dataIndex: 'title'
    }, {
      title: '发布时间',
      key: 'ct',
      dataIndex: 'ct'
    }, {
      title: '更新时间',
      key: 'ut',
      dataIndex: 'ut'
    }, {
      title: '浏览',
      key: 'pv',
      dataIndex: 'pv'
    }, {
      title: '留言',
      key: 'commentsCount',
      dataIndex: 'commentsCount'
    }, {
      title: '字数',
      key: 'contentLength',
      dataIndex: 'contentLength'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <React.Fragment>
          <Tag
            color='geekblue'
            onClick={() => this.handleTo(`/posts/create?id=${record._id}`)}
          >
            编辑
          </Tag>
          <Tag
            color='geekblue'
            onClick={() => this.handleTo(`/comments/comments?pid=${record._id}`)}
          >
            管理评论
          </Tag>
          <Tag color='red' onClick={() => this.showModal(record._id)}>删除</Tag>
        </React.Fragment>
      )
    }]

    return (
      <AdminTable
        modalText='确认删除文章？'
        modalShow={visible}
        handleClickModel={this.handleClickModel}
      >
        <Table
          loading={loading}
          dataSource={list}
          rowKey='_id'
          columns={colums}
          bordered
          pagination={{
            pageSize: 12,
            current: page,
            total: totalCount,
            onChange: this.handleChangePage
          }}
        />
      </AdminTable>
    )
  }
}

export default PostsPage
