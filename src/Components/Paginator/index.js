import { Text, Pagination } from '@mantine/core';
import React,{ useState, useEffect } from 'react';




const Paginator = ({ postsPerPage, totalPosts, paginate }) => {
    const [activePage, setPage] = useState(1);
useEffect(() => {
paginate(activePage)
}, [activePage]);
  return (
    <Pagination total={totalPosts} boundaries={2} initialPage={1} onChange={setPage} />
  );
};

export default Paginator