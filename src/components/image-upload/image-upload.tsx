import { FC } from 'react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';

import { FileUploadResponseDto } from '@/common/types/types';

type Props = {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: FC<Props> = ({ value, onChange }) => {
  const handleUpload = (result: FileUploadResponseDto) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="zsihp1f3"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div className="relative">
            <button
              className="flex flex-col items-center justify-center gap-4 text-neutral-600 w-full min-h-[300px] p-20 border-dashed border-2 border-neutral-300 cursor-pointer transition hover:opacity-70"
              type="button"
              onClick={() => open?.()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Click to upload</p>
            </button>
            
            {value && (
              <div className="w-full h-full absolute inset-0 pointer-events-none">
                <Image
                  src={value} 
                  style={{ objectFit: 'cover' }} 
                  fill
                  alt="House" 
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export { ImageUpload };
