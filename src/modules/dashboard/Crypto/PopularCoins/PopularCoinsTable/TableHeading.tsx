import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../../types/AppContextPropsType';

interface TableHeadingPorps {}

const TableHeading: React.FC<TableHeadingPorps> = () => {
  const useStyles = makeStyles((theme: CremaTheme) => ({
    borderBottomClass: {
      borderBottom: '0 none',
    },
    tableCell: {
      borderBottom: '0 none',
      fontSize: 14,
      padding: 8,
      fontFamily: Fonts.LIGHT,
      '&:first-child': {
        [theme.breakpoints.up('xl')]: {
          paddingLeft: 4,
        },
      },
      '&:last-child': {
        [theme.breakpoints.up('xl')]: {
          paddingRight: 4,
        },
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: 18,
        padding: 16,
      },
    },
  }));
  const classes = useStyles();
  return (
    <TableRow className={classes.borderBottomClass}>
      <TableCell className={classes.tableCell}>
        <IntlMessages id='common.num' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='common.name' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='dashboard.marketCap' />
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        <IntlMessages id='dashboard.volume24h' />
      </TableCell>
      <TableCell align='right' className={classes.tableCell}>
        <IntlMessages id='dashboard.24h' /> %
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
