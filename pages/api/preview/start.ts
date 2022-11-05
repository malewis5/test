import Cookies from 'cookies'

export default async function preview(req: any, res: any) {
  const cookies = new Cookies(req, res)

  // Enable Preview Mode by setting the cookies.
  res.setPreviewData({})

  //by default next.js set http only cookies internally which means our frontend can't access them
  //we are using this library so we can set a simple cookie. This way our frontend knows when in preview mode and will provide
  //a button in the header. Clicking that button will allow them to exit preview mode
  cookies.set('isPreview', 'true', {
    httpOnly: false,
  })
  //redirect back to the home page
  res.writeHead(307, { Location: '/' })
  res.end()
}
