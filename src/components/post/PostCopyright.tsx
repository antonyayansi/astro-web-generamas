import { author, site } from '@/config.json'
import { getFormattedDateTime } from '@/utils/date'
import { AnimatedSignature } from '../AnimatedSignature'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";

function getPostUrl(slug: string) {
  return new URL(slug, site.url).href
}

export function PostCopyright({
  title,
  slug,
  lastMod,
}: {
  title: string
  slug: string
  lastMod: Date
}) {
  const [lastModStr, setLastModStr] = useState('')
  const url = getPostUrl(slug)

  function handleCopyUrl() {
    navigator.clipboard.writeText(url)
    toast.success('Enlace del artículo copiado')
  }

  useEffect(() => {
    setLastModStr(getFormattedDateTime(lastMod))
  }, [lastMod])

  return (
    <section className="text-xs leading-loose text-secondary">
      <p>Título del artículo: {title}</p>
      <p>Autor del artículo: {author.name}</p>
      <p>
        <span>Enlace del artículo: {url}</span>
        <span role="button" className="ml-1 cursor-pointer select-none text-accent" onClick={handleCopyUrl}>
          [Copiar]
        </span>
      </p>
      <p>Última modificación: {lastModStr}</p>
      <hr className="my-3 border-primary" />
      <div>
        <p>
          Para reutilización comercial, por favor contacte al administrador del sitio para obtener autorización. Para reutilización no comercial, por favor mencione el origen del artículo y su enlace. Puede copiar y distribuir el trabajo en cualquier medio y de cualquier forma, también puede modificar y crear derivados, pero al distribuir obras derivadas, debe usar la misma licencia.
          <br />
          Este artículo está licenciado bajo la{' '}
          <a
            className="hover:underline hover:text-accent underline-offset-2"
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT License
          </a>
          .
        </p>
      </div>
    </section>
  )
}
