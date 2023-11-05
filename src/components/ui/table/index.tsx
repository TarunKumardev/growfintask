import React, { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table: FC<TableProps> & {
  Thead: FC<TableProps>;
  Tr: FC<TableProps>;
  Th: FC<TableProps>;
  Tbody: FC<TableProps>;
  Td: FC<TableProps>;
} = ({ children  , ...rest}) => {
  return <table {...rest} >{children}</table>;
}

Table.Thead = function TableThead({ children , ...rest}) {
  return <thead {...rest}>{children}</thead>;
}

Table.Tr = function TableRow({ children, ...rest}) {
  return <tr {...rest} >{children}</tr>;
}

Table.Th = function TableHeader({ children , ...rest}) {
  return <th { ...rest} >{children}</th>;
}

Table.Tbody = function TableBody({ children ,  ...rest}) {
  return <tbody {...rest} >{children}</tbody>;
}

Table.Td = function TableData({ children ,  ...rest}) {
  return <td { ...rest}>{children}</td>;
}

export default Table;