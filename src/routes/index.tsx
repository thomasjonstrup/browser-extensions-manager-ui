import { useMemo, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useLiveQuery } from "dexie-react-hooks";

import extensionsData from '../data.json';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { db } from '@/db';
import { Card } from '@/components/card/card';


type Extension = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  logo: string;
}

const Home = () => {
  const extensionsList = useLiveQuery(() => db.extensions.toArray());
  const [extensions, setExtensions] = useState<Extension[]>(extensionsList || extensionsData);
  const [filter, setFilter] = useState<'All' | 'Active' | 'InActive'>('All');

  const filteredExtensions = useMemo(() => {
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

  const removeExtension = (id: number) => {
    setExtensions((prevExtensions) => {
      return [...prevExtensions.filter((item) => item.id !== id)]
    })
  }

  const toggleActive = (id: number) => {
    setExtensions((prevExtensions) => {
      return prevExtensions.map((extension) => {
        if (extension.id === id) {
          return { ...extension, isActive: !extension.isActive };
        }
        return extension;
      });
    });
  };

  return (
    <section>
      <div className="container mx-auto py-2 max-w-5xl">
        <div className="flex flex-col gap-4 md:flex-row justify-between pb-4 items-center">
          <h1 className="text-3xl md:text-2xl font-bold text-neutral-900 dark:text-white">Extension List</h1>
          <div className="flex flex-row gap-2">
            <Button
              variant={filter === 'All' ? 'destructive' : 'default'}
              onClick={() => {
                setFilter('All')
              }}
            >
              All
            </Button>
            <Button
              variant={filter === 'Active' ? 'destructive' : 'default'}
              onClick={() => {
                setFilter('Active')
              }}
            >
              Active
            </Button>
            <Button
              variant={filter === 'InActive' ? 'destructive' : 'default'}
              onClick={() => {
                setFilter('InActive')
              }}
            >
              Inactive
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExtensions.map((extension) => {
            return (
                <Card name={extension.name} description={extension.description} logo={loadImage(extension.logo)} key={extension.id}>
                  <Button
                    onClick={() => {
                      removeExtension(extension.id);
                    }}
                  >
                    Remove
                  </Button>
                  <Switch
                    aria-label={`Is ${extension.name} extension active`}
                    name="isActive"
                    onClick={() => {
                      toggleActive(extension.id)
                    }}
                    checked={extension.isActive}
                  />
                </Card>
            );
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