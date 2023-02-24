import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default function clientAuth() {
  const set = ({
    field,
    value,
    path,
  }: {
    field: string
    path: string
    value: string
  }) => cookies.set(field, value, { path })
  const get = (field: string) => cookies.get(field)
  const remove = ({ field, path }: { field: string; path: string }) =>
    cookies.remove(field, { path })
  return { set, get, remove }
}
