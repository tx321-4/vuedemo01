export default [
  {
    url: '/upload/img',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {
          tmp_path: 'xxxxx'
        }
      }
    }
  }
]
