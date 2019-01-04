import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table } from "antd";
import { createActions } from "@/utils/createActions";
import { PostsTypesGetPosts } from "@/utils/types";
import style from "@/utils/utils.less";
import { Link } from "dva/router";

@connect(({ posts, loading }) => ({
  list: posts.list,
  totalCount: posts.totalCount,
  loading: loading.effects[PostsTypesGetPosts]
}))
class PostsPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
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
    console.log(current)
    this.setState({
      page: current
    }, () => {
      this.updatePosts()
    })
  }

  render() {
    const { list, totalCount, loading } = this.props
    const { page } = this.state
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <React.Fragment>
          <Link to={`/posts/create?id=${record._id}`} className='oprate' href="#">编辑</Link>
          <a href="#">删除</a>
        </React.Fragment>
      )
    }]

    return (
      <div className={style['tables-box']}>
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
      </div>
    )
  }
}

export default PostsPage
