import axios from 'axios'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

const CMS_API = process.env.CMS_API || 'http://localhost:1337'

const processPage = (baseURL, modDate, page, r) => {
  const pageURL = `${baseURL}/${page.route}`

  if (r.xml.indexOf(pageURL === -1)) {
    r.xml += '<url>'
    r.xml += `<loc>${pageURL}</loc>`
    r.xml += `<lastmod>${modDate}</lastmod>`
    r.xml += `<changefreq>weekly</changefreq>`
    r.xml += `<priority>0.5</priority>`
    r.xml += '</url>'
  }

  if (page.children.length) {
    page.children.forEach((children) => {
      processPage(baseURL, modDate, children, r)
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Sitemap = () => {}

const createSitemap = async (baseURL, SOURCE) => {
  const apiAxiosInstance = axios.create({ baseURL: CMS_API })
  let modDate = new Date().toISOString().replace('Z', '+00:00')

  const diskPages = glob.sync(SOURCE)

  if (diskPages.length) {
    const stats = fs.statSync(diskPages[0])
    modDate = new Date(stats.mtime).toISOString().replace('Z', '+00:00')
  }
  const r = { xml: '' }
  r.xml += '<?xml version="1.0" encoding="UTF-8"?>'
  r.xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'

  const navigation = await apiAxiosInstance.get('/navigationtrees/navigation')
  const peakPages = navigation.data.find((item) => item.title === 'PeakActivity')

  peakPages?.pages?.forEach((page) => {
    processPage(baseURL, modDate, page, r)
  })

  r.xml += '</urlset>'
  return r.xml
}

export const getServerSideProps = async ({ req, res }) => {
  const appDirectory = fs.realpathSync(process.cwd())
  const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

  // DESTINATION is where the real file is exported
  // By default is .next/public/sitemap.xml
  const DESTINATION = process.env.DESTINATION || path.join(resolveApp('.next/static'), 'sitemap.xml')

  // SOURCE is where are stored all pages files
  // By default it tracks all files in the pages folder
  // without considering the ones starting with `_` (e.g. _document.js and _app.js)
  const SOURCE = process.env.SOURCE || path.join(resolveApp('pages'), '/**/!(_*).js')

  const protocol = 'https:'
  const host = req.headers.host
  const xmlFile = await createSitemap(`${protocol}//${host}`, SOURCE)

  res.setHeader('Content-Type', 'application/xml')
  res.write(xmlFile)
  fs.writeFileSync(DESTINATION, xmlFile)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
