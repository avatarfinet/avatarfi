import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React from 'react'

function range(start: number, end: number | string) {
  let foo = []
  for (let i = start; i <= Number(end); i++) {
    foo.push(i)
  }
  return foo
}

export default function Pagination({
  perPage,
  total,
  page,
  setPage,
  setPerPage,
}: {
  perPage: number
  total: number
  page: number
  setPage: (page: number) => any
  setPerPage: (page: number) => any
}) {
  const pageRange = range(1, Math.round(total / perPage) || 1)
  const menu = (
    <Menu>
      <Menu.Item onClick={() => setPerPage(50)}>50</Menu.Item>
      <Menu.Item onClick={() => setPerPage(25)}>25</Menu.Item>
      <Menu.Item onClick={() => setPerPage(10)}>10</Menu.Item>
    </Menu>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Dropdown overlay={menu}>
        <Button size="small">
          {perPage} <DownOutlined />
        </Button>
      </Dropdown>
      <Button
        size="small"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        -
      </Button>
      {pageRange.map((i) => (
        <Button
          key={i}
          size="small"
          type={page === i ? 'primary' : 'default'}
          onClick={() => setPage(i)}
        >
          {i}
        </Button>
      ))}
      <Button
        disabled={pageRange.length <= 1}
        size="small"
        onClick={() => setPage(page + 1)}
      >
        +
      </Button>
    </div>
  )
}
