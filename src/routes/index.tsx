import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import extensions from '../data.json';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

type Extension = {
    name: string;
    description: string;
    isActive: boolean;
    logo: string;
}

const Home = () => {
  const [filter, setFilter] = useState<'All'|'Active'|'InActive'>('All');
  console.log("🚀 ~ Home ~ extensions:", extensions)

  const filteredExtensions = useMemo(() =>  {
    let filteredList: Extension[] = [];

    switch (filter) {
      case 'Active':
        filteredList = [...extensions.filter(item => item.isActive)];
        break;
      case 'InActive':
        filteredList = [...extensions.filter(item => !item.isActive)];
        break;

      default:
        filteredList = [...extensions]
        break;
    }

    return filteredList
  }, [filter, extensions])

  const loadImage = (imageName: string): string => {
    return new URL(imageName, import.meta.url).href
  };

  return (
    <section>
      <div className="container mx-auto py-2 max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row justify-between pb-4 items-center">
          <h1 className="text-2xl font-bold text-neutral-900">Extension List</h1>

          <div className="flex flex-row gap-2">
            <Button variant={filter === 'All' ? 'destructive' : 'default'} onClick={() => {
              setFilter('All')
            } }>All</Button>
            <Button variant={filter === 'Active' ? 'destructive' : 'default'} onClick={() => {
              setFilter('Active')
            } }>Active</Button>
            <Button variant={filter === 'InActive' ? 'destructive' : 'default'} onClick={() => {
              setFilter('InActive')
            } }>Inactive</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExtensions.map(extension => {
            return (
              <div className="block p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800">
                <div className="flex flew-row gap-4 pb-4">
                  <div className="w-16 h-16">
                    <img className="max-w-full" src={loadImage(extension.logo)}></img>
                  </div>
                  <div>
                    <h2 className="font-bold text-neutral-900 text-sm pb-1">{extension.name}</h2>
                    <p className="text-xs text-neutral-600">{extension.description}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <Button>Remove</Button>
                  <Switch aria-label={`Is ${extension.name} extension active`} name="isActive" checked={extension.isActive} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})

/**
Extensions List All Active Inactive DevLens Quickly inspect page layouts and visualize element boundaries. Remove StyleSpy Instantly analyze and copy CSS from any webpage element. Remove SpeedBoost Optimizes browser resource usage to accelerate page loading. Remove JSONWizard Formats, validates, and prettifies JSON responses in-browser. Remove TabMaster Pro Organizes browser tabs into groups and sessions. Remove ViewportBuddy Simulates various screen resolutions directly within the browser. Remove Markup Notes Enables annotation and notes directly onto webpages for collaborative debugging. Remove GridGuides Overlay customizable grids and alignment guides on any webpage. Remove Palette Picker Instantly extracts color palettes from any webpage. Remove LinkChecker Scans and highlights broken links on any page. Remove DOM Snapshot Capture and export DOM structures quickly. Remove ConsolePlus Enhanced developer console with advanced filtering and logging. Remove
 */