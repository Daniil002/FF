import { Pagination } from '@mantine/core';
import style from './Pagination.module.css';

type PaginationComponentProps = {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

const PaginationComponent = ({ total, page, onChange }: PaginationComponentProps) => {
  return (
    <div className={style['pag-wrapper']}>
      <Pagination total={total} page={page} onChange={onChange} className={style['pag-wrapper']} />
    </div>
  )
}

export default PaginationComponent;
