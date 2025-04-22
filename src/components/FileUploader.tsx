
import React, { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

const FileUploader = ({ 
  onFileSelect, 
  accept = ".csv,.xlsx,.xls", 
  maxSize = 10 * 1024 * 1024  // 10MB default
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);
    
    // Check file type
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (!fileType || !accept.includes(`.${fileType}`)) {
      setError(`Invalid file type. Please upload ${accept} files.`);
      return;
    }
    
    // Check file size
    if (file.size > maxSize) {
      setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      return;
    }
    
    setFileName(file.name);
    onFileSelect(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={cn("drop-zone flex flex-col items-center justify-center cursor-pointer", 
          isDragging && "drop-zone-active")}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileInput}
          ref={fileInputRef}
        />
        
        <div className="mb-4 p-4 rounded-full bg-primary/10">
          {fileName ? (
            <FileText className="h-10 w-10 text-primary" />
          ) : (
            <Upload className="h-10 w-10 text-primary" />
          )}
        </div>
        
        {fileName ? (
          <div className="text-center">
            <p className="text-sm font-medium">{fileName}</p>
            <p className="text-xs text-muted-foreground mt-1">Click or drag to replace</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-medium mb-1">Drag & drop your spreadsheet here</p>
            <p className="text-sm text-muted-foreground mb-3">
              Supports CSV, Excel (.xlsx, .xls)
            </p>
            <Button type="button" size="sm">
              Browse files
            </Button>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-3 text-sm text-destructive text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
