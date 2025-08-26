import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToHomeScreenPopup from '../common/AddToHomeScreenPopup';

export default function DownloadAppButton() {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  return (
    <>
      <div className="mt-8">
        <Button 
          variant="outline" 
          className="w-full bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl"
          onClick={() => setShowDownloadPopup(true)}
        >
          <Download className="w-4 h-4 mr-2" />
          Download App
        </Button>
      </div>

      <AddToHomeScreenPopup 
        isOpen={showDownloadPopup}
        onClose={() => setShowDownloadPopup(false)}
      />
    </>
  );
}