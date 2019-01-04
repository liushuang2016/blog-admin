import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag } from "antd";
import { createActions } from "@/utils/createActions";
import { UsersTypesUsers } from "@/utils/types";
import { routerRedux } from "dva/router";
import AdminTable from "@/components/AdminTable";
import { fetchDelUser } from "@/services/users";

@connect(({ users, loading }) => ({
  list: users.list,
  totalCount: users.totalCount,
  loading: loading.effects[UsersTypesUsers]
}))
class UsersPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      visible: false,
      deleteId: null
    }
  }

  componentDidMount() {
    this.updateUsers()
  }

  updateUsers = () => {
    const { page } = this.state
    const { dispatch } = this.props
    dispatch(createActions(UsersTypesUsers, page))
  }

  handleChangePage = (current) => {
    this.setState({
      page: current
    }, () => {
      this.updateUsers()
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
      const body = await fetchDelUser(deleteId)
      if (body.status === 200) {
        this.updateUsers()
      }
    }
  }

  render() {
    const { list, totalCount, loading } = this.props
    const { page, visible } = this.state
    const colums = [{
      title: '用户名',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: '注册时间',
      key: 'ct',
      dataIndex: 'ct'
    }, {
      title: 'ip',
      key: 'ip',
      dataIndex: 'ip'
    }, {
      title: '密码',
      key: 'password',
      dataIndex: 'password'
    }, {
      title: '留言数',
      key: 'commentsCount',
      dataIndex: 'commentsCount'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <React.Fragment>
          <Tag
            color='geekblue'
            onClick={() => this.handleTo(`/comments/comments?uid=${record._id}`)}
          >
            留言管理
          </Tag>
          <Tag color='red' onClick={() => this.showModal(record._id)}>删除</Tag>
        </React.Fragment>
      )
    }]

    return (
      <AdminTable
        modalText='确认删除用户？'
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

export default UsersPage
