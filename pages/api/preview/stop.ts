import Cookies from 'cookies'

export default async function exit(req: any, res: any) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // set our cookie server side
  const cookies = new Cookies(req, res)
  cookies.set('isPreview')

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}
