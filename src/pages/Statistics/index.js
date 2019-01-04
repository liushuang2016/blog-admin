import React from "react";
import { fetchStatistics } from "@/services/api";
import { Row, Col } from "antd";
import StatisticsItem from "./item";

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postsCount: 0,
      tagsCount: 0,
      usersCount: 0,
      commentsCount: 0
    }
  }

  componentDidMount = async () => {
    const body = await fetchStatistics()
    if (body.status === 200) {
      this.setState({
        postsCount: body.data.postsCount,
        tagsCount: body.data.tagsCount,
        usersCount: body.data.usersCount,
        commentsCount: body.data.commentsCount
      })
    }
  }

  render() {
    const { postsCount, tagsCount, usersCount, commentsCount } = this.state
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <StatisticsItem
              text='文章数: '
              count={postsCount}
            />
          </Col>
          <Col span={6}>
            <StatisticsItem
              text='评论数: '
              count={commentsCount}
            />
          </Col>
          <Col span={6}>
            <StatisticsItem
              text='用户数: '
              count={usersCount}
            />
          </Col>
          <Col span={6}>
            <StatisticsItem
              text='标签数: '
              count={tagsCount}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Statistics
