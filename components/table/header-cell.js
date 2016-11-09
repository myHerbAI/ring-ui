/* eslint-disable react/jsx-max-props-per-line */

import React from 'react';
import RingComponent from '../ring-component/ring-component';
import classNames from 'classnames';

import Icon from '../icon/icon';

import style from './table.css';

export default class HeaderCell extends RingComponent {
  onClick() {
    const {column, onSort, sortKey, sortOrder} = this.props;
    if (this.sortable && onSort) {
      onSort(column, !(sortKey === column.id && sortOrder));
    }
  }

  render() {
    const {column, onSort, sortKey, sortOrder} = this.props;

    this.sortable = true;
    if (column.sortable === false) {
      this.sortable = false;
    }

    let glyph = require('jetbrains-icons/caret-down.svg');
    if (sortKey === column.id && sortOrder) {
      glyph = require('jetbrains-icons/caret-up.svg');
    }

    const size = Icon.Size.Size16;

    const classes = classNames({
      [style.headerCell]: true,
      [style.headerCellSortable]: this.sortable && onSort,
      [style.headerCellSorted]: sortKey === column.id
    });

    return (
      <th className={classes} onClick={::this.onClick}>
        <span>{column.title}</span>
        {this.sortable && onSort ? <Icon className={style.sorter} glyph={glyph} size={size} /> : ''}
      </th>
    );
  }
}
