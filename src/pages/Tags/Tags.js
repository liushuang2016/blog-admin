import React, { PureComponent } from "react";
import { connect } from "dva";
import { Table, Tag } from "antd";
import { createActions } from "@/utils/createActions";
import { TagsTypesTags } from "@/utils/types";
import { routerRedux } from "dva/router";
import AdminTable from "@/components/AdminTable";
import { fetchDelUser } from "@/services/users";
import { fetchDelTags } from "@/services/tags";

@connect(({ tags, loading }) => ({
  list: tags.list,
  totalCount: tags.totalCount,
  loading: loading.effects[TagsTypesTags]
}))
class TagsPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      visible: false,
      deleteId: null
    }
  }

  componentDidMount() {
    this.updateTags()
  }

  updateTags = () => {
    const { page } = this.state
    const { dispatch } = this.props
    dispatch(createActions(TagsTypesTags, page))
  }

  handleChangePage = (current) => {
    this.setState({
      page: current
    }, () => {
      this.updateTags()
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
      const body = await fetchDelTags(deleteId)
      if (body.status === 200) {
        this.updateTags()
      }
    }
  }

  render() {
    const { list, totalCount, loading } = this.props
    const { page, visible } = this.state
    const colums = [{
      title: '标签名',
      key: 'tag',
      dataIndex: 'tag'
    }, {
      title: '创建时间',
      key: 'ct',
      dataIndex: 'ct'
    }, {
      title: '文章数',
      key: 'postCount',
      dataIndex: 'postCount'
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
        modalText='确认删除标签？'
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

export default TagsPage
