import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table } from "antd";
import { createActions } from "@/utils/createActions";
import { PostsTypesGetPosts } from "@/utils/types";
import style from "@/utils/utils.less";
import { Link } from "dva/router";

@connect(({ posts }) => ({
  list: posts.list,
  totalCount: posts.totalCount
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
    // console.log(createActions(PostsGetPosts, page))
    dispatch(createActions(PostsTypesGetPosts, page))
  }

  handleChangePage = (page) => {
    this.setState({
      page
    })
    this.updatePosts()
  }

  render() {
    const { list, totalCount } = this.props
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
          dataSource={list}
          rowKey='_id'
          columns={colums}
          bordered
          total={totalCount}
          defaultCurrent={page}
          pageSize={12}
          onChange={this.handleChangePage}
        />
      </div>
    )
  }
}

export default PostsPage
