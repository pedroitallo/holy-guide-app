import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, File, Image, Music, Loader, CheckCircle, XCircle, Copy } from 'lucide-react';
import { UploadFile } from '@/api/integrations';

export default function FileManagerTab() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    const results = [];

    for (const file of files) {
      try {
        const result = await UploadFile({ file });
        results.push({
          name: file.name,
          url: result.file_url,
          type: file.type,
          size: file.size,
          status: 'success'
        });
      } catch (error) {
        results.push({
          name: file.name,
          status: 'error',
          error: error.message
        });
      }
    }

    setUploadedFiles(prev => [...results, ...prev]);
    setIsUploading(false);
    setUploadStatus(`Uploaded ${results.filter(r => r.status === 'success').length} of ${files.length} files`);
    
    // Clear status after 5 seconds
    setTimeout(() => setUploadStatus(null), 5000);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type?.startsWith('audio/')) return <Music className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <Input
                type="file"
                multiple
                accept="image/*,audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer text-zinc-600 hover:text-zinc-800 ${isUploading ? 'opacity-50' : ''}`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Click to upload files</p>
                    <p className="text-sm text-zinc-500">Images and Audio files supported</p>
                  </div>
                )}
              </label>
            </div>
            
            {uploadStatus && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{uploadStatus}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No files uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {file.status === 'success' ? (
                    <>
                      {getFileIcon(file.type)}
                      <div className="flex-1">
                        <p className="font-medium text-zinc-800">{file.name}</p>
                        <p className="text-sm text-zinc-500">{formatFileSize(file.size)}</p>
                        <p className="text-xs text-zinc-400 font-mono break-all">{file.url}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(file.url)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-zinc-800">{file.name}</p>
                        <p className="text-sm text-red-600">{file.error}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}