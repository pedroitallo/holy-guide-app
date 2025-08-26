import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotificationManager from './NotificationManager';
import NotificationAutomations from './notifications/NotificationAutomations';
import NotificationMetrics from './notifications/NotificationMetrics';
import FileManagerTab from './FileManagerTab';

export default function NotificationsTab() {
  return (
    <Tabs defaultValue="files" className="w-full">
      <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-zinc-200 p-1.5 rounded-xl">
        <TabsTrigger value="files" className="data-[state=active]:bg-white data-[state=active]:shadow-md">📁 Files</TabsTrigger>
        <TabsTrigger value="manager" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Manager</TabsTrigger>
        <TabsTrigger value="automations" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Automations</TabsTrigger>
        <TabsTrigger value="metrics" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Metrics</TabsTrigger>
      </TabsList>
      <TabsContent value="files" className="mt-6">
        <FileManagerTab />
      </TabsContent>
      <TabsContent value="manager" className="mt-6">
        <div className="max-w-2xl mx-auto">
           <NotificationManager />
        </div>
      </TabsContent>
      <TabsContent value="automations" className="mt-6">
        <div className="max-w-2xl mx-auto">
          <NotificationAutomations />
        </div>
      </TabsContent>
      <TabsContent value="metrics" className="mt-6">
        <NotificationMetrics />
      </TabsContent>
    </Tabs>
  );
}