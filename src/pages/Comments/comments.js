import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag, Alert } from "antd";
import { createActions } from "@/utils/createActions";
import { CommentsTypesComments } from "@/utils/types";
import { routerRedux } from "dva/router";
import AdminTable from "@/components/AdminTable";
import { fetchDelUser } from "@/services/users";
import { fetchDelComment } from "@/services/comments";

@connect(({ comments, loading }) => ({
  list: comments.list,
  totalCount: comments.totalCount,
  loading: loading.effects[CommentsTypesComments]
}))
class CommentsPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      visible: false,
      deleteId: null,
      pid: null,
      uid: null,
      all: false
    }
  }

  componentDidMount() {
    const { query } = this.props.location
    this.setState({
      pid: query.pid,
      uid: query.uid
    }, () => {
      this.updateComments()
    })
  }

  updateComments = () => {
    const { page, pid, uid, all } = this.state
    const { dispatch } = this.props
    if (all) {
      dispatch(createActions(CommentsTypesComments, { page }))
    } else {
      dispatch(createActions(CommentsTypesComments, { page, pid, uid }))
    }
  }

  handleChangePage = (current) => {
    this.setState({
      page: current
    }, () => {
      this.updateComments()
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
      const body = await fetchDelComment(deleteId)
      if (body.status === 200) {
        this.updateComments()
      }
    }
  }

  switchShow = (flag) => {
    this.setState({
      all: flag
    }, () => {
      this.updateComments()
    })
  }

  renderHeader = () => {
    const { uid, pid } = this.state
    if (uid || pid) {
      const role = uid ? `User: ${uid}` : pid ? `Post: ${pid}` : ''
      return (
        <div style={{ padding: '8px', textAlign: 'center' }}>
          <Alert
            style={{ marginBottom: '8px' }}
            message={`当前: ${role}`}
            type="info"
            showIcon
          />
          <Tag onClick={() => this.switchShow(true)} color='geekblue'>
            查看所有评论
          </Tag>
          <Tag onClick={() => this.switchShow(false)} color='geekblue'>
            查看{role}
          </Tag>
        </div>
      )
    }
    return ''
  }

  render() {
    const { list, totalCount, loading } = this.props
    const { page, visible } = this.state
    const colums = [{
      title: '评论者',
      key: 'authorName',
      dataIndex: 'author.name'
    }, {
      title: '所属文章',
      key: 'postTitle',
      dataIndex: 'postId.title'
    }, {
      title: '评论时间',
      key: 'ct',
      dataIndex: 'ct'
    }, {
      title: '内容',
      key: 'content',
      dataIndex: 'content'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <React.Fragment>
          <Tag color='red' onClick={() => this.showModal(record._id)}>删除</Tag>
        </React.Fragment>
      )
    }]

    return (
      <AdminTable
        modalText='确认删除留言？'
        modalShow={visible}
        handleClickModel={this.handleClickModel}
      >
        {this.renderHeader()}
        <Table
          loading={loading}
          dataSource={list}
          rowKey='_id'
          columns={colums}
          bordered
          pagination={{
            pageSize: 20,
            current: page,
            total: totalCount,
            onChange: this.handleChangePage
          }}
        />
      </AdminTable>
    )
  }
}

export default CommentsPage
