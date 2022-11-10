import {
  filterContentBlocksByDate,
  getContentBlocksByTag,
  IContentBlock,
} from '@peakactivity/merce-shared-frontend-components'
import * as React from 'react'

import getDefaultCmsTransport from '../../../../services/api/cmsInterceptor'
import logProviderFactory from '../../../../utils/logs/logProviderFactory'

interface IContentBlocksResponse {
  error: string
  data: IContentBlock[] | any
}

const TextSlider = () => {
  const [contentBlocks, setContentBlocks] = React.useState<IContentBlock[] | null>(null)
  React.useEffect(() => {
    getContentBlocks()
    const script = document.createElement('script')

    script.async = true
    script.innerHTML = `
    var slideIndex = 1;

    function plusSlides(n) {
      showSlides((slideIndex += n));
    }
    function currentSlide(n) {
      showSlides((slideIndex = n));
    }
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (slides) {
        if (n > slides.length) {
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
      }
    }`

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const getContentBlocks = async () => {
    try {
      let contentBlocksArray: IContentBlock[] | null = null
      const contentBlocksResponse: IContentBlocksResponse = await getContentBlocksByTag(
        getDefaultCmsTransport(true),
        'freeShippingBanner'
      )
      if (contentBlocksResponse.data) {
        contentBlocksArray = filterContentBlocksByDate(contentBlocksResponse.data)
        setContentBlocks(contentBlocksArray)
      }
    } catch (e) {
      setContentBlocks(null)
      logProviderFactory.logError(e)
    }
  }

  return (
    <div>
      {contentBlocks?.[0]?.content?.css && (
        <style
          dangerouslySetInnerHTML={{
            __html: contentBlocks?.[0]?.content?.css,
          }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: contentBlocks?.[0]?.content?.html ?? '' }} />
    </div>
  )
}

export default TextSlider
