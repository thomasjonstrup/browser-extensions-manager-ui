import { Card } from "@/components/card/card"
import { db } from "@/db"
import { createFileRoute } from "@tanstack/react-router"
import { useLiveQuery } from "dexie-react-hooks"
import type { JSX } from "react"

const ExtensionComponent = (): JSX.Element => {
  const { extensionId } = Route.useParams()

  const extension = useLiveQuery(() => db.extensions.where('id').equals(Number(extensionId))?.first());

    const loadImage = (imageName: string): string => {
      const path = `../../${imageName}`
    return new URL(path, import.meta.url).href
  };

  if (!extension) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <div className="container mx-auto py-2 max-w-5xl">
        <Card name={extension?.name} description={extension.description} logo={loadImage(extension.logo)}>
        </Card>
      </div>
    </section>
  )
}

export const Route = createFileRoute('/extensions/$extensionId')({
  component: ExtensionComponent,
});