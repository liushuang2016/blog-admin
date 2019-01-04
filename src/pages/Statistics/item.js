import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import style from "./index.less";

class StatisticsItem extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }

  render() {
    const { text, count } = this.props

    return (
      <Card>
        <div>{text}</div>
        <div className={style.count}>{count}</div>
      </Card>
    )
  }
}

export default StatisticsItem
