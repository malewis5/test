/**
 * Add to IE11 pollifill or libs
 */
const addIE11Lib = (src: string) => {
  const ie11Script = `
  (function() {
    if(/Trident.*rv:/.test(navigator.userAgent)) { // evaluate ie11
      var ie11Script = document.createElement('script'); ie11Script.type = 'text/javascript'; ie11Script.async = true;
      ie11Script.src = '${src}';
      ie11Script.crossOrigin = "anonymous";
      (document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]).appendChild(ie11Script);
    }
  })();
  `
  return ie11Script
}
export default addIE11Lib
