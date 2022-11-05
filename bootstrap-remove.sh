#!/bin/bash
array=( "$@" )

for i in "${array[@]}"
do
  case $i in
	  "account")
      sed -i.bak '/<UserAccountContext.Provider>/d' ./pages/_app.tsx;
      sed -i.bak '/<\/UserAccountContext.Provider>/d' ./pages/_app.tsx;
      sed -i.bak '/import UserAccountContext/d' ./pages/_app.tsx;
      rm -rf 'pages/account'
      rm 'pages/_app.tsx.bak'
      ;;
    "cart")
      sed -i.bak '/<CartContext.Provider/d' ./pages/_app.tsx;
      sed -i.bak '/<\/CartContext.Provider/d' ./pages/_app.tsx;
      sed -i.bak '/import CartContext/d' ./pages/_app.tsx;
      rm -rf 'pages/cart'
      rm -rf 'pages/cart-layouts'
      rm 'pages/checkout.tsx'
      rm 'pages/checkout-confirmation.tsx'
      rm 'pages/_app.tsx.bak'
      ;;
    "pdp")
      rm -rf 'pages/product'
      rm -rf 'pages/pdp-layouts'
      ;;
    "blog")
      rm -rf 'pages/blog'
      ;;
    "content")
      rm -rf 'pages/page'
      ;;
    *)
      echo $"Usage: $0 {start|stop|restart|condrestart|status}";
      ;;
  esac
done
