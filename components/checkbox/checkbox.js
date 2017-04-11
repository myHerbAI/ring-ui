import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/icon';

import styles from './checkbox.css';

/**
 * @name Checkbox
 * @category Components
 * @tags 3.0
 * @constructor
 * @extends {ReactComponent}
 * @example-file ./checkbox.examples.html
 */
export default class Checkbox extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node
  };

  ref = el => {
    this.input = el;
  }

  render() {
    const {children, label, ...restProps} = this.props; // eslint-disable-line no-unused-vars

    const classes = classNames(
      styles.input,
      this.props.className
    );

    return (
      <label
        className={styles.checkbox}
        data-test="ring-checkbox"
      >
        <input
          {...restProps}
          ref={this.ref}
          type="checkbox"
          className={classes}
        />
        <span className={styles.cell}>
          <Icon
            className={styles.icon}
            glyph={require('jetbrains-icons/checkmark.svg')}
            size={Icon.Size.Size14}
          />
        </span>
        <span className={styles.label}>{label || children}</span>
      </label>
    );
  }
}
