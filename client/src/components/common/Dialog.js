import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Icon from './Icon';
import Button from './Button';
import styles from './Dialog.cm.styl';

function Dialog(props) {
  const {
    width,
    isOpen,
    onClose,
    title,
    showClose = true,
    showBack = false,
    onBack,
    children,
    okText = '确定',
    showCancel = true,
    cancelText = '取消',
    onOk,
    showFooter = true,
    showHeader = true,
    clickOutsideClosable = true,
    loading,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={clickOutsideClosable ? onClose : () => {}}
      overlayClassName={styles.overlay}
      className={styles.content}
      style={{
        content: {
          width,
        },
      }}
    >
      {showHeader && (
        <div className={styles.header}>
          {showBack && (<Icon name="backward" className={styles.iconBack} onClick={onBack} />)}
          <div className={styles.title}>
            {title}
          </div>
          {showClose && <Icon name="close" className={styles.iconClose} onClick={onClose} />}
          <div >

          </div>
        </div>
      )}
      <div className={styles.body}>
        {children}
      </div>
      {showFooter && (
        <div className={styles.footer}>
          {showCancel && (
            <Button type="outlined" onClick={onClose} className={styles.btnCancel} color="grey">
              {cancelText}
            </Button>
          )}
          <Button loading={loading} type="filled" onClick={onOk}>
            {okText}
          </Button>
        </div>
      )}
    </Modal>
  );
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number,
  title: PropTypes.string,
  showClose: PropTypes.bool,
  showBack: PropTypes.bool,
  okText: PropTypes.string,
  showCancel: PropTypes.bool,
  onBack: PropTypes.func,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
  clickOutsideClosable: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Dialog.defaultProps = {
  isOpen: false,
};

export default Dialog;
