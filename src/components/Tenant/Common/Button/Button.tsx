import * as React from 'react'

import css from './Button.scss'

interface ButtonLinkProps {
  children: React.ReactNode
  onClick?: (target: any) => void
}

interface ButtonTextProps {
  children: React.ReactNode
  onClick?: (target: any) => void
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({ children, onClick }) => (
  <button onClick={onClick} type="button" className={css.buttonLink}>
    {children}
  </button>
)

export const ButtonText: React.FC<ButtonTextProps> = ({ children, onClick }) => (
  <div onClick={onClick} className={css.buttonText}>
    {children}
  </div>
)
