import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Modal } from "antd";
import style from "@/utils/utils.less";

class AdminTable extends PureComponent {
  static propTypes = {
    handleClickModel: PropTypes.func.isRequired,
    modalShow: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired
  }

  handleOk = async () => {
    const { handleClickModel } = this.props
    handleClickModel(true)
  }

  handleCancel = () => {
    const { handleClickModel } = this.props
    handleClickModel(false)
  }

  render() {
    const { children, modalText, modalShow } = this.props

    return (
      <div className={style['tables-box']}>
        {children}
        <Modal
          title="提示"
          visible={modalShow}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {modalText}
        </Modal>
      </div>
    )
  }
}

export default AdminTable
